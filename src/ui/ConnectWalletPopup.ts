import { DomNode, el, Popup } from "@hanul/skynode";
import msg from "msg.js";

const klip = require("klip-sdk");

export default class ConnectWalletPopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(
            this.content = el(".connect-wallet-popup",
                el("img.talker", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-1.png" }),
                el("p", msg("CONNECT_WALLET_POPUP_DESCRIPTION")),
                el("a.button.connect-kaikas-button",
                    el("img", { src: "/images/logo/kaikas.svg" }),
                    msg("CONNECT_KAIKAS_BUTTON"),
                    {
                        click: () => { },
                    },
                ),
                el("a.button.connect-klip-button",
                    el("img", { src: "/images/logo/klip.svg" }),
                    msg("CONNECT_KLIP_BUTTON"),
                    {
                        click: async () => {
                            const result = await klip.prepare.auth({ bappName: "도지사운드클럽" });
                            klip.request(result.request_key, () => alert('모바일 환경에서 실행해주세요'))
                            setTimeout(async () => {
                                const a = await klip.getResult(result.request_key)
                                console.log(alert(JSON.stringify(a)));
                            }, 5000);
                        },
                    },
                ),
                el("a.button.cancel-button", msg("CANCEL_CONNECT_BUTTON"), {
                    click: () => this.delete(),
                }),
            ),
        );
    }
}
