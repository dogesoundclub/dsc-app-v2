import { BigNumber } from "ethers";
import Contract from "./Contract";
declare class SloganContract extends Contract {
    readonly HOLIDAY_PERIOD = 0;
    readonly REGISTER_CANDIDATE_PERIOD = 1;
    readonly VOTE_PERIOD = 2;
    constructor();
    getRound(): Promise<BigNumber>;
    getRoundBlock(round: number): Promise<BigNumber>;
    getPeriod(): Promise<BigNumber>;
    getRemains(): Promise<BigNumber>;
    getCandidateMateCount(): Promise<BigNumber>;
    getUserVotes(round: number, user: string): Promise<BigNumber>;
    getCandidateCount(round: number): Promise<BigNumber>;
    getCandidate(round: number, index: number): Promise<string>;
    getCandidateRegister(round: number, index: number): Promise<string>;
    getVotes(round: number, candidate: number): Promise<BigNumber>;
    registerCandidate(slogan: string, count: number): Promise<void>;
    vote(candidate: number, count: number): Promise<void>;
    getElected(round: number): Promise<BigNumber>;
}
declare const _default: SloganContract;
export default _default;
//# sourceMappingURL=SloganContract.d.ts.map