import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../Config";
import Contract from "./Contract";

interface Proposal {
    proposer: string,
    title: string,
    summary: string,
    content: string,
    note: string,
    blockNumber: BigNumber,
    votePeriod: BigNumber,
    canceled: boolean,
    executed: boolean,
}

class VoteContract extends Contract {

    public readonly VOTING = 0;
    public readonly CANCELED = 1;
    public readonly RESULT_SAME = 2;
    public readonly RESULT_FOR = 3;
    public readonly RESULT_AGAINST = 4;

    constructor() {
        super(Config.contracts.Vote, require("./VoteContractABI.json"));
    }

    public async propose(

        title: string,
        summary: string,
        content: string,
        note: string,
        votePeriod: BigNumberish,

        mates: string,
        mateIds: BigNumberish[],

    ): Promise<void> {
        await this.runWalletMethod("propose",

            title,
            summary,
            content,
            note,
            votePeriod,

            mates,
            mateIds,
        );
    }

    public async getMateVoted(round: number, mates: string, mateId: number): Promise<boolean> {
        return await this.runMethod("mateVoted", round, mates, mateId);
    }

    public async getProposal(proposalId: BigNumberish): Promise<Proposal> {
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

    public async voteFor(proposalId: BigNumberish, mates: string, mateIds: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("voteFor", proposalId, mates, mateIds);
    }

    public async voteAgainst(proposalId: BigNumberish, mates: string, mateIds: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("voteAgainst", proposalId, mates, mateIds);
    }

    public async cancel(proposalId: BigNumberish): Promise<void> {
        await this.runWalletMethod("cancel", proposalId);
    }

    public async execute(proposalId: BigNumberish): Promise<void> {
        await this.runWalletMethod("execute", proposalId);
    }

    public async getResult(proposalId: BigNumberish): Promise<number> {
        return await this.runMethod("result", proposalId);
    }
}

export default new VoteContract();
