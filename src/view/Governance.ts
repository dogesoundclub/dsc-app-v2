import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import ProposalList from "../component/governance/ProposalList";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Governance implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("GOVERNANCE_TITLE");
        Layout.current.content.append(this.container = el(".governance-view",
            el("h1", msg("GOVERNANCE_TITLE")),
            el("p", msg("GOVERNANCE_DESCRIPTION")),
            el("section",
                el("h2", msg("GOVERNANCE_PROPOSALS")),
                el("a.propose-button", msg("GOVERNANCE_PROPOSE_BUTTON"), {
                    click: () => ViewUtil.go("/governance/propose"),
                }),
            ),
            new ProposalList(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
