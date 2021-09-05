import { ScrollItemDomNode } from "@hanul/skynode";
import MateItem from "./MateItem";

export default class MateLine extends ScrollItemDomNode<number[]> {

    public get nodeData() { return this.ids; }

    constructor(private ids: number[], selectable: boolean) {
        super((() => {
            const dom = document.createElement("div");
            dom.className = "mate-line"
            return dom;
        })());
        for (const id of ids) {
            this.append(new MateItem(id, selectable));
        }
    }
}
