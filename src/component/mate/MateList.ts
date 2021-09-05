import { ScrollableDomNode } from "@hanul/skynode";
import MateLine from "./MateLine";

export default class MateList extends ScrollableDomNode<number[]> {

    constructor(selectable: boolean = false) {
        super(
            (() => {
                const dom = document.createElement("div");
                dom.className = "mate-list"
                return dom;
            })(),
            { childTag: "div", baseChildHeight: window.innerWidth < 800 ? 64 : 90 },
            (ids) => new MateLine(ids, selectable),
        );
    }
}
