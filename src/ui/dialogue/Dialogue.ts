import { DomNode, el, Popup } from "@hanul/skynode";

export default class Dialogue extends Popup {

    public content: DomNode;

    constructor(
        tag: string,
        message: string,
        confirmTitle: string,
        confirm: () => void,
    ) {
        super(".dialogue-background");
        this.append(
            this.content = el(`.dialogue${tag}`,
                el("p", message),
                el("a.cancel-button", "Cancel", {
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
