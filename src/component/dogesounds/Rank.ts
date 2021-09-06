import { DomNode, el } from "@hanul/skynode";
import SloganContract from "../../contracts/SloganContract";

export default class Rank extends DomNode {

    constructor(private round: number) {
        super("tr");
        this.load();
    }

    private async load() {

        const elected = (await SloganContract.getElected(this.round)).toNumber();

        let dogesound = "";
        try {
            dogesound = await SloganContract.getCandidate(this.round, elected);
        } catch (e) {/* ignore. */ }

        const block = (await SloganContract.getRoundBlock(this.round)).toNumber();
        const votes = (await SloganContract.getVotes(this.round, elected)).toNumber();

        this.append(
            el("td", String(this.round + 1)),
            el("td", block === -1 ? "" : String(block)),
            el("td", block === -1 ? "" : String(votes)),
            el("td", block === -1 ? "" : dogesound),
        );
    }
}
