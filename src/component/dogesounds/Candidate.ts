import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";

export default class Candidate extends DomNode {

    private radio: DomNode<HTMLInputElement> | undefined;

    constructor(
        votable: boolean, dogeSound: string, votes: number, checked: boolean,
    ) {
        super("li.candidate");
        if (votable === true) {
            this.radio = el<HTMLInputElement>("input", {
                name: "dogesounds-candidate-radio",
                type: "radio",
                change: () => {

                },
            }).appendTo(this);
            if (checked === true) {
                this.radio.domElement.checked = true;
            }
        }
        this.append(
            el("div.doge-sound", dogeSound, {
                click: () => {
                    if (this.radio !== undefined && this.radio.domElement.checked !== true) {
                        this.radio.domElement.checked = true;
                    }
                },
            }),
            el("div.votes", `${msg("DOGESOUNDS_VOTE_COUNT")} : ${votes}`),
        );
    }
}
