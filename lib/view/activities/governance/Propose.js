"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../../Layout"));
const ViewUtil_1 = __importDefault(require("../../ViewUtil"));
class Propose {
    constructor() {
        this.connectHandler = () => {
            this.load();
        };
        Layout_1.default.current.title = (0, msg_js_1.default)("GOVERNANCE_TITLE");
        let titleInput;
        let summaryInput;
        let contentInput;
        let noteInput;
        let termCheckbox;
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-propose-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("GOVERNANCE_TITLE")), (0, skynode_1.el)("a.back-button", `< ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
            click: () => ViewUtil_1.default.go("/governance"),
        }), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_FORM_TITLE")} -`), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_TITLE"), titleInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_TITLE_PLACEHOLDER") })), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_SUMMARY"), summaryInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_SUMMARY_PLACEHOLDER") })), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT"), (0, skynode_1.el)("p", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT_DESCRIOPTION")), (0, skynode_1.el)("a.markdown-button", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }), contentInput = (0, skynode_1.el)("textarea.content", { placeholder: (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT_PLACEHOLDER") })), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_NOTE"), noteInput = (0, skynode_1.el)("textarea")), (0, skynode_1.el)(".proposer", (0, skynode_1.el)("h5", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_PROPOSER")), this.proposer = (0, skynode_1.el)("span"))), (0, skynode_1.el)("label.terms", termCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }), (0, skynode_1.el)("p", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_TERM"))), (0, skynode_1.el)("a.submit-button", (0, msg_js_1.default)("GOVERNANCE_PROPOSE_SUBMIT_BUTTON"), {
            click: async () => {
            },
        })));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            this.proposer.empty().appendText(owner);
        }
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        this.container.delete();
    }
}
exports.default = Propose;
//# sourceMappingURL=Propose.js.map