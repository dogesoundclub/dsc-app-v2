import { BigNumber } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import Contract from "./Contract";

class SloganContract extends Contract {

    public readonly HOLIDAY_PERIOD = 0;
    public readonly REGISTER_CANDIDATE_PERIOD = 1;
    public readonly VOTE_PERIOD = 2;

    constructor() {
        super(Config.contracts.Slogan, require("./SloganContractABI.json"));
    }

    public async getRound(): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.round().call());
    }

    public async getRoundBlock(round: number): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.roundBlock(round).call());
    }

    public async getPeriod(): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.period().call());
    }

    public async getRemains(): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.remains().call());
    }

    public async getCandidateMateCount(): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.candidateMateCount().call());
    }

    public async getUserVotes(round: number, user: string): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.userVotes(round, user).call());
    }

    public async getCandidateCount(round: number): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.candidateCount(round).call());
    }

    public async getCandidate(round: number, index: number): Promise<string> {
        return await this.contract.methods.candidate(round, index).call();
    }

    public async getCandidateRegister(round: number, index: number): Promise<string> {
        return await this.contract.methods.candidateRegister(round, index).call();
    }

    public async getVotes(round: number, candidate: number): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.votes(round, candidate).call());
    }

    public async registerCandidate(slogan: string, count: number): Promise<void> {
        const register = await Wallet.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.registerCandidate(slogan, count).send({ from: register, gas: 1500000 });
    }

    public async vote(candidate: number, count: number): Promise<void> {
        const voter = await Wallet.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.vote(candidate, count).send({ from: voter, gas: 1500000 });
    }

    public async getElected(round: number): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.elected(round).call());
    }
}

export default new SloganContract();
