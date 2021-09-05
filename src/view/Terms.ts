import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Terms implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("TERMS_TITLE");
        Layout.current.content.append(this.container = el(".terms-view",
            el("h1", msg("TERMS_TITLE")),
            el("section",
                el("h2", msg("TERMS_SECTION_1_TITLE")),
                el("p", msg("TERMS_SECTION_1")),
            ),
            el("section",
                el("h2", msg("TERMS_SECTION_2_TITLE")),
                el("p", msg("TERMS_SECTION_2")),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
