"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const MateList_1 = __importDefault(require("../../component/mate/MateList"));
const MateContract_1 = __importDefault(require("../../contracts/MateContract"));
const VoteContract_1 = __importDefault(require("../../contracts/VoteContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Alert_1 = __importDefault(require("../../ui/dialogue/Alert"));
const Confirm_1 = __importDefault(require("../../ui/dialogue/Confirm"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Propose {
    constructor() {
        this.connectHandler = () => {
            this.load();
        };
        Layout_1.default.current.title = (0, msg_js_1.default)("GOVERNANCE_TITLE");
        let titleInput;
        let periodInput;
        let summaryInput;
        let contentInput;
        let noteInput;
        let termCheckbox;
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-propose-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("GOVERNANCE_TITLE")), (0, skynode_1.el)("a.back-button", `< ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
            click: () => ViewUtil_1.default.go("/governance"),
        }), (0, skynode_1.el)(".form", (0, skynode_1.el)("h2", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_FORM_TITLE")} -`), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_TITLE"), titleInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_TITLE_PLACEHOLDER") })), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_PERIOD"), periodInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_PERIOD_PLACEHOLDER") })), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_SUMMARY"), summaryInput = (0, skynode_1.el)("textarea", { placeholder: (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_SUMMARY_PLACEHOLDER") })), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT"), (0, skynode_1.el)("p", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT_DESCRIOPTION")), (0, skynode_1.el)("a.markdown-button", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }), contentInput = (0, skynode_1.el)("textarea.content", { placeholder: (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT_PLACEHOLDER") })), (0, skynode_1.el)("label", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_NOTE"), noteInput = (0, skynode_1.el)("textarea")), (0, skynode_1.el)(".proposer", (0, skynode_1.el)("h5", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_PROPOSER")), this.proposer = (0, skynode_1.el)("span"))), this.wallet = (0, skynode_1.el)(".wallet"), this.ownedMates = (0, skynode_1.el)(".owned-mates"), this.selectedMates = (0, skynode_1.el)(".selected-mates", (0, msg_js_1.default)("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(0))), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_MAX_SELECT_BUTTON")}`, {
            click: () => this.mateList.maxSelect(25),
        })), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_DESELECT_BUTTON")}`, {
            click: () => this.mateList.deselect(),
        })), this.mateList = new MateList_1.default(true, false), (0, skynode_1.el)("label.terms", termCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }), (0, skynode_1.el)("p", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_TERM"))), (0, skynode_1.el)("a.submit-button", (0, msg_js_1.default)("GOVERNANCE_PROPOSE_SUBMIT_BUTTON"), {
            click: () => {
                if (termCheckbox.domElement.checked === true) {
                    new Confirm_1.default((0, msg_js_1.default)("GOVERNANCE_PROPOSE_SUBMIT_CONFIRM"), (0, msg_js_1.default)("CONFIRM_BUTTON"), async () => {
                        const owner = await Wallet_1.default.loadAddress();
                        if (owner !== undefined) {
                            const proposeMateCount = (await VoteContract_1.default.getProposeMateCount()).toNumber();
                            if (this.mateList.selectedMateIds.length !== proposeMateCount) {
                                new Alert_1.default((0, msg_js_1.default)("GOVERNANCE_PROPOSAL_NEED_MORE_MATES_ERROR").replace(/{proposeMateCount}/, String(proposeMateCount)), (0, msg_js_1.default)("CONFIRM_BUTTON"));
                            }
                            else {
                                if (await MateContract_1.default.isApprovedForAll(owner, VoteContract_1.default.address) !== true) {
                                    await MateContract_1.default.setApprovalForAll(VoteContract_1.default.address, true);
                                }
                                await VoteContract_1.default.propose(titleInput.domElement.value, summaryInput.domElement.value, contentInput.domElement.value, noteInput.domElement.value, periodInput.domElement.value, MateContract_1.default.address, this.mateList.selectedMateIds);
                                setTimeout(() => ViewUtil_1.default.go("/governance"), 2000);
                            }
                        }
                    });
                }
            },
        })));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
        this.mateList.on("selectMate", () => {
            this.selectedMates.empty().appendText((0, msg_js_1.default)("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(this.mateList.selectedMateIds.length)));
        });
        this.loadMates();
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            this.proposer.empty().appendText(owner);
        }
    }
    async loadMates() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            this.wallet.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_WALLET_ADDRESS")} : `);
            this.wallet.append((0, skynode_1.el)("a", walletAddress, { href: `https://opensea.io/${walletAddress}`, target: "_blank" }));
            const mateBalance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            this.ownedMates.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_OWNED_MATES_COUNT").replace(/{count}/, String(mateBalance))}`);
            const mates = [];
            const promises = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index) => {
                    const mateId = (await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index)).toNumber();
                    mates.push(mateId);
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.mateList.load(mates);
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