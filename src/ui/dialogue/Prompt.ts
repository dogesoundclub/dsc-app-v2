import { DomNode, el } from "@hanul/skynode";
import Dialogue from "./Dialogue";

export default class Prompt extends Dialogue {

    private input: DomNode<HTMLInputElement>;

    constructor(message: string, confirmTitle: string, confirm: (value: string) => void) {
        super(".prompt", message, confirmTitle, () => {
            confirm(this.input.domElement.value);
        });
        this.main.append(
            this.input = el("input.input"),
        );
    }
}
