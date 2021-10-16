import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class BuyMix implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("BUY_MIX_TITLE");
        Layout.current.content.append(this.container = el(".buymix-view",
            el("h1", msg("BUY_MIX_TITLE")),
            el("img.klayswap-logo", { src: "/images/logo/klayswap.png" }),
            el("p", "MIX는 국내 최대의 DeFi 서비스인 Klayswap에서 구매하실 수 있습니다."),
            el("a", "Klayswap에서 MIX 구매하기", { href: "https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf", target: "_blank" }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
