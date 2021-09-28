import { DomNode } from "@hanul/skynode";
import VoteContract from "../../contracts/VoteContract";
import Loading from "../loading/Loading";
import Proposal from "./Proposal";

export default class ProposalList extends DomNode {

    private loading: Loading | undefined;

    constructor() {
        super("ul.proposal-list");
        this.append(
            this.loading = new Loading(),
        );
        this.load();
    }

    private async load() {
        const count = await VoteContract.getProposalCount();
        for (let proposalId = count - 1; proposalId >= 0; proposalId -= 1) {
            const proposal = await VoteContract.getProposal(proposalId);
            this.append(new Proposal(proposalId, proposal));
        }
        this.loading?.delete();
        this.loading = undefined;
    }
}
