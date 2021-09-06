import { DomNode } from "@hanul/skynode";

export default class Candidate extends DomNode {

    constructor(
        round: number, votable: boolean,
        dogeSound: string, votes: number,
    ) {
        super(".candidate");
    }
}
