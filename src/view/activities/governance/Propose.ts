import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../../Layout";
import ViewUtil from "../../ViewUtil";

export default class Propose implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("GOVERNANCE_TITLE");
        Layout.current.content.append(this.container = el(".governance-propose-view",
            el("h1", msg("GOVERNANCE_TITLE")),
            el("a.back-button", `< ${msg("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
                click: () => ViewUtil.go("/governance"),
            }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
