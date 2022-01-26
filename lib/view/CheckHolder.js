"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Store_1 = __importDefault(require("../Store"));
class CheckHolder {
    constructor() {
        this.codeStore = new Store_1.default("codeStore");
        skynode_1.BodyNode.append(this.container = (0, skynode_1.el)(".check-holder", "TEST!", (0, skynode_1.el)("a.discord-login-button", "Login with Discord", {
            href: "https://discord.com/api/oauth2/authorize?client_id=899254874510868540&redirect_uri=http%3A%2F%2Flocalhost%3A8413%2Fcheckholder&response_type=code&scope=identify",
        })));
        this.checkDiscordLogin();
    }
    async checkDiscordLogin() {
        let code = this.codeStore.get("code");
        if (code === undefined) {
            code = new URLSearchParams(window.location.search).get("code");
            if (code !== null) {
                try {
                    await superagent_1.default.get("https://localhost:8072/discord/token").query({
                        code,
                        redirect_uri: `${window.location.protocol}//${window.location.host}/checkholder`,
                    });
                    this.codeStore.set("code", code, true);
                }
                catch (error) {
                    console.error(error);
                    code = undefined;
                }
            }
            else {
                code = undefined;
            }
        }
        if (code === undefined) {
            this.codeStore.delete("code");
        }
        else {
            try {
                const result = await superagent_1.default.get("https://localhost:8072/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            }
            catch (error) {
                console.error(error);
                this.codeStore.delete("code");
            }
        }
    }
    async checkWalletConnected(code) {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const message = "Check Holder";
            const signedMessage = await Wallet_1.default.signMessage(message);
            try {
                const result = await fetch("https://localhost:8072/checkholder/mates", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                    }),
                });
                console.log((await result.json()).isHolder);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = CheckHolder;
//# sourceMappingURL=CheckHolder.js.map