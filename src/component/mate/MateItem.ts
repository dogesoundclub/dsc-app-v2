import { DomNode, el } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";
import SkyUtil from "skyutil";
import MateList from "./MateList";

export default class MateItem extends DomNode {

    private nameDisplay: DomNode | undefined;
    private checkbox: DomNode<HTMLInputElement> | undefined;

    constructor(list: MateList, private id: number, name: string | undefined, selectable: boolean) {
        super(`a.mate-item${list.votedMates.includes(id) === true ? ".off" : ""}`);
        this.style({
            backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)`,
        });
        this.append(el("span.id", `#${id}`));

        if (selectable === true) {
            if (list.votedMates.includes(id) !== true) {
                this.checkbox = el<HTMLInputElement>("input", {
                    type: "checkbox",
                    click: (event) => event.stopPropagation(),
                    change: () => {
                        if (this.checkbox !== undefined) {
                            if (this.checkbox.domElement.checked === true) {
                                if (list.selectedMateIds.includes(id) !== true) {
                                    list.selectedMateIds.push(id);
                                }
                            } else {
                                SkyUtil.pull(list.selectedMateIds, id);
                            }
                            list.fireEvent("selectMate");
                        }
                    }
                }).appendTo(this);
                this.checkbox.domElement.checked = list.selectedMateIds.includes(id);
            }
        } else {
            this.nameDisplay = el("span.name", name).appendTo(this);
        }

        this.onDom("click", () => {
            if (selectable === true) {
                if (this.checkbox !== undefined) {
                    this.checkbox.domElement.checked = this.checkbox.domElement.checked !== true;
                    if (this.checkbox.domElement.checked === true) {
                        if (list.selectedMateIds.includes(id) !== true) {
                            list.selectedMateIds.push(id);
                        }
                    } else {
                        SkyUtil.pull(list.selectedMateIds, id);
                    }
                    list.fireEvent("selectMate");
                }
            } else {
                SkyRouter.go(`/mates/${id}`);
                window.scrollTo(0, 0);
            }
        });
    }
}
