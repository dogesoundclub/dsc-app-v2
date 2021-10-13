import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Booth implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("BOOTH_TITLE");
        Layout.current.content.append(this.container = el(".booth-view",
            el("h1", msg("BOOTH_TITLE")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
