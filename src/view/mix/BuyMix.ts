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
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
