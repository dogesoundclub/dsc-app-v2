import { DomNode, el } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";
import SkyUtil from "skyutil";
import NameContract from "../../contracts/NameContract";
import MateList from "./MateList";

export default class MateItem extends DomNode {

    private nameDisplay: DomNode | undefined;
    private checkbox: DomNode<HTMLInputElement> | undefined;

    constructor(list: MateList, private id: number, selectable: boolean) {
        super("a.mate-item");
        this.style({
            backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)`,
        });
        this.append(el("span.id", `#${id}`),
        );
        if (selectable === true) {
            this.checkbox = el<HTMLInputElement>("input", {
                type: "checkbox",
                click: (event) => event.stopPropagation(),
                change: () => {
                    if (this.checkbox !== undefined) {
                        if (this.checkbox.domElement.checked === true) {
                            if (list.selectedMaidIds.includes(id) !== true) {
                                list.selectedMaidIds.push(id);
                            }
                        } else {
                            SkyUtil.pull(list.selectedMaidIds, id);
                        }
                        list.fireEvent("selectMate");
                    }
                }
            }).appendTo(this);
            this.checkbox.domElement.checked = list.selectedMaidIds.includes(id);
        } else {
            this.nameDisplay = el("span.name").appendTo(this);
            this.loadName();
        }
        this.onDom("click", () => {
            if (selectable === true) {
                if (this.checkbox !== undefined) {
                    this.checkbox.domElement.checked = this.checkbox.domElement.checked !== true;
                    if (this.checkbox.domElement.checked === true) {
                        if (list.selectedMaidIds.includes(id) !== true) {
                            list.selectedMaidIds.push(id);
                        }
                    } else {
                        SkyUtil.pull(list.selectedMaidIds, id);
                    }
                    list.fireEvent("selectMate");
                }
            } else {
                SkyRouter.go(`/mates/${id}`);
                window.scrollTo(0, 0);
            }
        });
    }

    private async loadName() {
        this.nameDisplay?.appendText(await NameContract.getName(this.id));
    }
}
