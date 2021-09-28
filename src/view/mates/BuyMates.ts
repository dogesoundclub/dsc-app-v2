import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class BuyMates implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("BUY_MATES_TITLE");
        Layout.current.content.append(this.container = el(".buymates-view",
            el("h1", msg("BUY_MATES_TITLE")),
            el("img.opensea-logo", { src: "/images/logo/opensea.png" }),
            el("p", msg("BUY_MATES_DESCRIPTION")),
            el("a", msg("BUY_MATES_BUTTON"), { href: "https://opensea.io/collection/dogesoundclub-mates", target: "_blank" }),
            el("p.warning", msg("BUY_MATES_WARNING")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
