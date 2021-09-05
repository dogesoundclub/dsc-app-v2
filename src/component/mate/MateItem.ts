import { DomNode, el } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";
import NameContract from "../../contracts/NameContract";

export default class MateItem extends DomNode {

    private nameDisplay: DomNode;

    constructor(private id: number, selectable: boolean) {
        super("a.mate-item");
        this.style({
            backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)`,
        });
        this.append(
            el("span.id", `#${id}`),
            this.nameDisplay = el("span.name"),
        );
        this.onDom("click", () => {
            SkyRouter.go(`/mates/${id}`);
            window.scrollTo(0, 0);
        });
        this.loadName();
    }

    private async loadName() {
        this.nameDisplay.appendText(await NameContract.getName(this.id));
    }
}
