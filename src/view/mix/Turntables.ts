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
            el("p", "턴테이블 및 리스너는 추후 공개됩니다!"),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
