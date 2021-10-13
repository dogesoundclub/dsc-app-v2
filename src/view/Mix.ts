import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mix implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("MIX_TITLE");
        Layout.current.content.append(this.container = el(".mix-view",
            el("h1", msg("MIX_TITLE")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
