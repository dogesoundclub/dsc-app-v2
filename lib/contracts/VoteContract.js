"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Contract_1 = __importDefault(require("./Contract"));
class VoteContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Vote, require("./VoteContractABI.json"));
        this.VOTING = 0;
        this.CANCELED = 1;
        this.RESULT_SAME = 2;
        this.RESULT_FOR = 3;
        this.RESULT_AGAINST = 4;
    }
    async propose(title, summary, content, note, votePeriod, mates, mateIds) {
        await this.runWalletMethod("propose", title, summary, content, note, votePeriod, mates, mateIds);
    }
    async getMateVoted(round, mates, mateId) {
        return await this.runMethod("mateVoted", round, mates, mateId);
    }
    async getProposal(proposalId) {
        const result = await this.runMethod("proposals", proposalId);
        return {
            proposer: result[0],
            title: result[1],
            summary: result[2],
            content: result[3],
            note: result[4],
            blockNumber: result[5],
            votePeriod: result[6],
            canceled: result[7],
            executed: result[8],
        };
    }
    async voteFor(proposalId, mates, mateIds) {
        await this.runWalletMethod("voteFor", proposalId, mates, mateIds);
    }
    async voteAgainst(proposalId, mates, mateIds) {
        await this.runWalletMethod("voteAgainst", proposalId, mates, mateIds);
    }
    async cancel(proposalId) {
        await this.runWalletMethod("cancel", proposalId);
    }
    async execute(proposalId) {
        await this.runWalletMethod("execute", proposalId);
    }
    async getResult(proposalId) {
        return await this.runMethod("result", proposalId);
    }
}
exports.default = new VoteContract();
//# sourceMappingURL=VoteContract.js.map