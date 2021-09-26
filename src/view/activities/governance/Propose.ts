import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Wallet from "../../../klaytn/Wallet";
import Layout from "../../Layout";
import ViewUtil from "../../ViewUtil";

export default class Propose implements View {

    private container: DomNode;
    private proposer: DomNode;

    constructor() {
        Layout.current.title = msg("GOVERNANCE_TITLE");

        let titleInput: DomNode;
        let summaryInput: DomNode;
        let contentInput: DomNode;
        let noteInput: DomNode;
        let termCheckbox: DomNode<HTMLInputElement>;

        Layout.current.content.append(this.container = el(".governance-propose-view",
            el("h1", msg("GOVERNANCE_TITLE")),
            el("a.back-button", `< ${msg("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
                click: () => ViewUtil.go("/governance"),
            }),
            el(".form",
                el("h2", `- ${msg("GOVERNANCE_PROPOSAL_FORM_TITLE")} -`),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_TITLE"),
                    titleInput = el("input", { placeholder: msg("GOVERNANCE_PROPOSAL_TITLE_PLACEHOLDER") })
                ),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_SUMMARY"),
                    summaryInput = el("input", { placeholder: msg("GOVERNANCE_PROPOSAL_SUMMARY_PLACEHOLDER") })
                ),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_CONTENT"),
                    el("p", msg("GOVERNANCE_PROPOSAL_CONTENT_DESCRIOPTION")),
                    el("a.markdown-button", msg("GOVERNANCE_PROPOSAL_CONTENT_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                    contentInput = el("textarea.content", { placeholder: msg("GOVERNANCE_PROPOSAL_CONTENT_PLACEHOLDER") })
                ),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_NOTE"),
                    noteInput = el("textarea"),
                ),
                el(".proposer",
                    el("h5", msg("GOVERNANCE_PROPOSAL_PROPOSER")),
                    this.proposer = el("span"),
                ),
            ),
            el("label.terms",
                termCheckbox = el("input", { type: "checkbox" }),
                el("p", msg("GOVERNANCE_PROPOSAL_TERM")),
            ),
            el("a.submit-button", msg("GOVERNANCE_PROPOSE_SUBMIT_BUTTON"), {
                click: async () => {
                    //TODO:
                },
            }),
        ));
        this.load();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            this.proposer.empty().appendText(owner);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        Wallet.off("connect", this.connectHandler);
        this.container.delete();
    }
}
