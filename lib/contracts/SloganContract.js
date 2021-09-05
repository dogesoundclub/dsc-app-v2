"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Contract_1 = __importDefault(require("./Contract"));
class SloganContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Slogan, require("./SloganContractABI.json"));
        this.HOLIDAY_PERIOD = 0;
        this.REGISTER_CANDIDATE_PERIOD = 1;
        this.VOTE_PERIOD = 2;
    }
    async getRound() {
        return ethers_1.BigNumber.from(await this.contract.methods.round().call());
    }
    async getRoundBlock(round) {
        return ethers_1.BigNumber.from(await this.contract.methods.roundBlock(round).call());
    }
    async getPeriod() {
        return ethers_1.BigNumber.from(await this.contract.methods.period().call());
    }
    async getRemains() {
        return ethers_1.BigNumber.from(await this.contract.methods.remains().call());
    }
    async getCandidateMateCount() {
        return ethers_1.BigNumber.from(await this.contract.methods.candidateMateCount().call());
    }
    async getUserVotes(round, user) {
        return ethers_1.BigNumber.from(await this.contract.methods.userVotes(round, user).call());
    }
    async getCandidateCount(round) {
        return ethers_1.BigNumber.from(await this.contract.methods.candidateCount(round).call());
    }
    async getCandidate(round, index) {
        return await this.contract.methods.candidate(round, index).call();
    }
    async getCandidateRegister(round, index) {
        return await this.contract.methods.candidateRegister(round, index).call();
    }
    async getVotes(round, candidate) {
        return ethers_1.BigNumber.from(await this.contract.methods.votes(round, candidate).call());
    }
    async registerCandidate(slogan, count) {
        const register = await Wallet_1.default.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.registerCandidate(slogan, count).send({ from: register, gas: 1500000 });
    }
    async vote(candidate, count) {
        const voter = await Wallet_1.default.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.vote(candidate, count).send({ from: voter, gas: 1500000 });
    }
    async getElected(round) {
        return ethers_1.BigNumber.from(await this.contract.methods.elected(round).call());
    }
}
exports.default = new SloganContract();
//# sourceMappingURL=SloganContract.js.map