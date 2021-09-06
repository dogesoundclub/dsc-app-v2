import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import SloganContract from "../../contracts/SloganContract";
import Rank from "./Rank";

export default class RankList extends DomNode {

    private rankList: DomNode;

    constructor() {
        super(".dogesounds-rank-list");
        this.append(
            el("table",
                el("thead",
                    el("tr",
                        el("th", "#", { width: "10%" }),
                        el("th", "BLOCK #", { width: "20%" }),
                        el("th", "VOTES", { width: "15%" }),
                        el("th", "DOGESOUND", { width: "55%" }),
                    ),
                ),
                this.rankList = el("tbody"),
            ),
        );
        this.loadMessages();
    }

    private async loadMessages() {
        const round = (await SloganContract.getRound()).toNumber();
        SkyUtil.repeat(round, (index) => {
            this.rankList.append(new Rank(round - index - 1));
        });
    }
}
