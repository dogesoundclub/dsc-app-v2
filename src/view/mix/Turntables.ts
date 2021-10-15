import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Turntables implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("TURNTABLES_TITLE");
        Layout.current.content.append(this.container = el(".turntables-view",
            el("h1", msg("TURNTABLES_TITLE")),
            el("p", "Work in Progress"),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
