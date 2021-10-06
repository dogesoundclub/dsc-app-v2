"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const xss_1 = __importDefault(require("xss"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const MateList_1 = __importDefault(require("../../component/mate/MateList"));
const MateContract_1 = __importDefault(require("../../contracts/MateContract"));
const VoteContract_1 = __importDefault(require("../../contracts/VoteContract"));
const Klaytn_1 = __importDefault(require("../../klaytn/Klaytn"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Detail {
    constructor(params) {
        Layout_1.default.current.title = (0, msg_js_1.default)("GOVERNANCE_TITLE");
        let forRadio;
        let againstRadio;
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-detail-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("GOVERNANCE_TITLE")), (0, skynode_1.el)("a.back-button", `< ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
            click: () => ViewUtil_1.default.go("/governance"),
        }), this.content = (0, skynode_1.el)(".content", this.loading = new Loading_1.default()), this.wallet = (0, skynode_1.el)(".wallet"), this.ownedMates = (0, skynode_1.el)(".owned-mates"), this.votableMates = (0, skynode_1.el)(".votable-mates"), this.selectedMates = (0, skynode_1.el)(".selected-mates", (0, msg_js_1.default)("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(0))), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_MAX_SELECT_BUTTON")}`, {
            click: () => this.mateList.maxSelect(),
        })), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_DESELECT_BUTTON")}`, {
            click: () => this.mateList.deselect(),
        })), this.mateList = new MateList_1.default(true, false), (0, skynode_1.el)(".select", (0, skynode_1.el)("label.for", (0, skynode_1.el)("span.title", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_VOTE_FOR")), forRadio = (0, skynode_1.el)("input", {
            name: "governance-radio",
            type: "radio",
        })), (0, skynode_1.el)("label.against", (0, skynode_1.el)("span.title", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_VOTE_AGAINST")), againstRadio = (0, skynode_1.el)("input", {
            name: "governance-radio",
            type: "radio",
        }))), (0, skynode_1.el)("a.vote-button", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_VOTE_BUTTON"), {
            click: async () => {
                if (this.proposalId !== undefined) {
                    if (forRadio.domElement.checked === true) {
                        await VoteContract_1.default.voteFor(this.proposalId, MateContract_1.default.address, this.mateList.selectedMateIds);
                        setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                    }
                    if (againstRadio.domElement.checked === true) {
                        await VoteContract_1.default.voteAgainst(this.proposalId, MateContract_1.default.address, this.mateList.selectedMateIds);
                        setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                    }
                }
            },
        })));
        this.load(params.id);
        this.mateList.on("selectMate", () => {
            this.selectedMates.empty().appendText((0, msg_js_1.default)("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(this.mateList.selectedMateIds.length)));
        });
    }
    async load(id) {
        this.proposalId = parseInt(id, 10);
        const proposal = await VoteContract_1.default.getProposal(id);
        const title = (0, skynode_1.el)("h1", (0, skynode_1.el)("span", proposal.title)).appendTo(this.content);
        if (proposal.executed === true) {
            title.append((0, skynode_1.el)(".result.executed", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_EXECUTED")} -`));
        }
        else {
            const result = await VoteContract_1.default.getResult(id);
            if (result === VoteContract_1.default.VOTING) {
                title.append((0, skynode_1.el)(".result.voting", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_VOTING")} -`));
            }
            else if (result === VoteContract_1.default.CANCELED) {
                title.append((0, skynode_1.el)(".result.canceled", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CANCELED")} -`));
            }
            else if (result === VoteContract_1.default.RESULT_SAME) {
                title.append((0, skynode_1.el)(".result.same", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_RESULT_SAME")} -`));
            }
            else if (result === VoteContract_1.default.RESULT_FOR) {
                title.append((0, skynode_1.el)(".result.for", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_RESULT_FOR")} -`));
            }
            else if (result === VoteContract_1.default.RESULT_AGAINST) {
                title.append((0, skynode_1.el)(".result.against", `- ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_RESULT_AGAINST")} -`));
            }
        }
        const currentBlock = await Klaytn_1.default.loadBlockNumber();
        const timer = (0, skynode_1.el)(".timer", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_REMAIN_BLOCKS").replace(/{block}/, String(proposal.votePeriod - (currentBlock - proposal.blockNumber)))).appendTo(this.content);
        this.timerInterval = setInterval(async () => {
            const currentBlock = await Klaytn_1.default.loadBlockNumber();
            const remains = proposal.votePeriod - (currentBlock - proposal.blockNumber);
            if (remains <= 1) {
                setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                clearInterval(this.timerInterval);
            }
            else {
                timer.empty().appendText((0, msg_js_1.default)("GOVERNANCE_PROPOSAL_REMAIN_BLOCKS").replace(/{block}/, String(remains)));
            }
        }, 1000);
        const voteCounts = (0, skynode_1.el)(".vote-counts").appendTo(this.content);
        voteCounts.append((0, skynode_1.el)(".for-votes", (0, skynode_1.el)("span.title", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_VOTE_FOR")), (0, skynode_1.el)("span.count", String(await VoteContract_1.default.getForVotes(id)))));
        voteCounts.append((0, skynode_1.el)(".against-votes", (0, skynode_1.el)("span.title", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_VOTE_AGAINST")), (0, skynode_1.el)("span.count", String(await VoteContract_1.default.getAgainstVotes(id)))));
        let content;
        this.content.append((0, skynode_1.el)("h2", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_SUMMARY")), (0, skynode_1.el)("p", proposal.summary), (0, skynode_1.el)("h2", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_CONTENT")), content = (0, skynode_1.el)(".content.markdown-body"), (0, skynode_1.el)("h2", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_NOTE")), (0, skynode_1.el)("p", proposal.note), (0, skynode_1.el)("h2", (0, msg_js_1.default)("GOVERNANCE_PROPOSAL_PROPOSER")), (0, skynode_1.el)("p", proposal.proposer));
        content.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(proposal.content));
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            this.wallet.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_WALLET_ADDRESS")} : `);
            this.wallet.append((0, skynode_1.el)("a", walletAddress, { href: `https://opensea.io/${walletAddress}`, target: "_blank" }));
            const mateBalance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            this.ownedMates.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_OWNED_MATES_COUNT").replace(/{count}/, String(mateBalance))}`);
            const mates = [];
            const votedMates = [];
            const promises = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index) => {
                    const mateId = (await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index)).toNumber();
                    mates.push(mateId);
                    if (await VoteContract_1.default.getMateVoted(id, MateContract_1.default.address, mateId) === true) {
                        votedMates.push(mateId);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.votableMates.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_VOTABLE_MATES_COUNT").replace(/{count}/, String(mateBalance - votedMates.length))}`);
            this.mateList.load(mates, votedMates);
        }
        this.loading?.delete();
        this.loading = undefined;
    }
    changeParams(params, uri) {
        this.load(params.id);
    }
    close() {
        if (this.timerInterval !== undefined) {
            clearInterval(this.timerInterval);
        }
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map