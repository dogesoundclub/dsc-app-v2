import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "./Contract";
interface Proposal {
    proposer: string;
    title: string;
    summary: string;
    content: string;
    note: string;
    blockNumber: BigNumber;
    votePeriod: BigNumber;
    canceled: boolean;
    executed: boolean;
}
declare class VoteContract extends Contract {
    readonly VOTING = 0;
    readonly CANCELED = 1;
    readonly RESULT_SAME = 2;
    readonly RESULT_FOR = 3;
    readonly RESULT_AGAINST = 4;
    constructor();
    propose(title: string, summary: string, content: string, note: string, votePeriod: BigNumberish, mates: string, mateIds: BigNumberish[]): Promise<void>;
    getMateVoted(round: number, mates: string, mateId: number): Promise<boolean>;
    getProposal(proposalId: BigNumberish): Promise<Proposal>;
    voteFor(proposalId: BigNumberish, mates: string, mateIds: BigNumberish[]): Promise<void>;
    voteAgainst(proposalId: BigNumberish, mates: string, mateIds: BigNumberish[]): Promise<void>;
    cancel(proposalId: BigNumberish): Promise<void>;
    execute(proposalId: BigNumberish): Promise<void>;
    getResult(proposalId: BigNumberish): Promise<number>;
}
declare const _default: VoteContract;
export default _default;
//# sourceMappingURL=VoteContract.d.ts.map