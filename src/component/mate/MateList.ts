import { ScrollableDomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
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

    public draw(mates: number[]) {

        let index = 0;
        const mateData: number[][] = [];
        SkyUtil.repeat(window.innerWidth < 800 ? Math.ceil(mates.length / 5) : Math.ceil(mates.length / 8), () => {
            const ids: number[] = [];
            SkyUtil.repeat(window.innerWidth < 800 ? 5 : 8, () => {
                ids.push(mates[index]);
                index += 1;
                if (index === mates.length) {
                    return false;
                }
            });
            mateData.push(ids);
            if (index === mates.length) {
                return false;
            }
        });

        this.init(mateData);
        this.calculateSize();
    }
}
