import { DomNode, el, Popup } from "@hanul/skynode";
import msg from "msg.js";

export default class Dialogue extends Popup {

    public content: DomNode;
    protected main: DomNode;

    constructor(
        tag: string,
        message: string,
        confirmTitle: string,
        confirm: () => void,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(`.dialogue${tag}`,
                el("p", message),
                this.main = el("main"),
                el("a.cancel-button", msg("CANCEL_BUTTON"), {
                    click: () => this.delete(),
                }),
                el("a.confirm-button", confirmTitle, {
                    click: () => {
                        confirm();
                        this.delete();
                    },
                }),
            ),
        );
    }
}
