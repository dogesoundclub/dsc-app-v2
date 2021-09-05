import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class MateDetail implements View {

    private container: DomNode;

    constructor(params: ViewParams) {
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
        Layout.current.content.append(this.container = el(".matedetail-view",
            el("h1", msg("MATE_DETAIL_TITLE").replace(/{id}/, params.id)),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void {
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
    }

    public close(): void {
        this.container.delete();
    }
}
