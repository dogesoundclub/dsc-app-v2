"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const VoteContract_1 = __importDefault(require("../../contracts/governance/VoteContract"));
const Loading_1 = __importDefault(require("../loading/Loading"));
const Proposal_1 = __importDefault(require("./Proposal"));
class ProposalList extends skynode_1.DomNode {
    constructor() {
        super("ul.proposal-list");
        this.append(this.loading = new Loading_1.default());
        this.load();
    }
    async load() {
        const count = await VoteContract_1.default.getProposalCount();
        for (let proposalId = count - 1; proposalId >= 0; proposalId -= 1) {
            const proposal = await VoteContract_1.default.getProposal(proposalId);
            this.append(new Proposal_1.default(proposalId, proposal));
        }
        this.loading?.delete();
        this.loading = undefined;
    }
}
exports.default = ProposalList;
//# sourceMappingURL=ProposalList.js.map