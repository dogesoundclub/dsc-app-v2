import { DomNode } from "@hanul/skynode";

export default class CandidateList extends DomNode {

    constructor(round: number, votable?: boolean) {
        super(".candidate-list");
    }
}
