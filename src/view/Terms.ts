import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Terms implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("TERMS_TITLE");
        Layout.current.content.append(this.container = el(".terms-view",
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
