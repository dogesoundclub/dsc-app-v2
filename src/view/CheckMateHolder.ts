import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import DiscordUserInfo from "../DiscordUserInfo";
import Wallet from "../klaytn/Wallet";
import Store from "../Store";

export default class CheckMateHolder implements View {

    private container: DomNode;

    public discordUser: DiscordUserInfo | undefined;
    private codeStore = new Store("codeStore");

    constructor() {
        BodyNode.append(this.container = el(".check-holder",
            el("h1", "메이트 홀더 인증 페이지"),
            el("a.discord-login-button", "Login with Discord", {
                href: "https://discord.com/api/oauth2/authorize?client_id=899254874510868540&redirect_uri=https%3A%2F%2Fdogesound.club%2Fcheckmateholder&response_type=code&scope=identify",
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
                    await superagent.get("https://api.dogesound.club/discord/token").query({
                        code,
                        redirect_uri: `${window.location.protocol}//${window.location.host}/checkmateholder`,
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
                const result = await superagent.get("https://api.dogesound.club/discord/me").query({ code });
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
                const result = await fetch("https://api.dogesound.club/checkholder/mates", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                        address,
                    }),
                });
                if ((await result.json()).isHolder === true) {
                    alert("홀더 인증 완료");
                } else {
                    alert("홀더 인증 실패");
                }
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
