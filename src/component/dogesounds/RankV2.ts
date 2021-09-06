import { DomNode, el } from "@hanul/skynode";
import DogeSoundContestV2Contract from "../../contracts/DogeSoundContestV2Contract";

export default class RankV2 extends DomNode {

    constructor(private round: number) {
        super("tr");
        this.load();
    }

    private async load() {

        const elected = (await DogeSoundContestV2Contract.getElected(this.round)).toNumber();

        let dogesound = "";
        try {
            dogesound = await DogeSoundContestV2Contract.getCandidate(this.round, elected);
        } catch (e) {/* ignore. */ }

        const block = (await DogeSoundContestV2Contract.getRoundBlock(this.round)).toNumber();
        const votes = (await DogeSoundContestV2Contract.getVotes(this.round, elected)).toNumber();

        this.append(
            el("td", String(this.round + 1)),
            el("td", block === -1 ? "" : String(block)),
            el("td", block === -1 ? "" : String(votes)),
            el("td", block === -1 ? "" : dogesound),
        );
    }
}
