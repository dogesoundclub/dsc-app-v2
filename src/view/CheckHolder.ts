import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import DiscordUserInfo from "../DiscordUserInfo";
import Wallet from "../klaytn/Wallet";
import Store from "../Store";

export default class CheckHolder implements View {

    private container: DomNode;

    public discordUser: DiscordUserInfo | undefined;
    private codeStore = new Store("codeStore");

    constructor() {
        BodyNode.append(this.container = el(".check-holder",
            "TEST!",
            el("a.discord-login-button", "Login with Discord", {
                href: "https://discord.com/api/oauth2/authorize?client_id=899254874510868540&redirect_uri=http%3A%2F%2Flocalhost%3A8413%2Fcheckholder&response_type=code&scope=identify",
            }),
        ));
        this.checkDiscordLogin();
    }

    private async checkDiscordLogin() {

        let code = this.codeStore.get<string>("code");
        if (code === undefined) {
            code = new URLSearchParams(window.location.search).get("code")!;
            if (code !== null) {
                try {
                    await superagent.get("https://localhost:8072/discord/token").query({
                        code,
                        redirect_uri: `${window.location.protocol}//${window.location.host}/checkholder`,
                    });
                    this.codeStore.set("code", code, true);
                } catch (error) {
                    console.error(error);
                    code = undefined;
                }
            } else {
                code = undefined;
            }
        }

        if (code === undefined) {
            this.codeStore.delete("code");
        } else {
            try {
                const result = await superagent.get("https://localhost:8072/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            } catch (error) {
                console.error(error);
                this.codeStore.delete("code");
            }
        }
    }

    private async checkWalletConnected(code: string) {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const address = await Wallet.loadAddress();
        if (address !== undefined) {

            const message = "Check Holder";
            const signedMessage = await Wallet.signMessage(message);

            try {
                const result = await fetch("https://localhost:8072/checkholder/mates", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                    }),
                });
                console.log((await result.json()).isHolder);
            } catch (error) {
                console.error(error);
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
