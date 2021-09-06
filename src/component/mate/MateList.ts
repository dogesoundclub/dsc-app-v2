import { ScrollableDomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import MateLine from "./MateLine";

export default class MateList extends ScrollableDomNode<number[]> {

    public selectedMateIds: number[] = [];
    public votedMates: number[] = [];

    private drawingMates: number[] = [];

    constructor(selectable: boolean = false) {
        super(
            (() => {
                const dom = document.createElement("div");
                dom.className = "mate-list"
                return dom;
            })(),
            { childTag: "div", baseChildHeight: window.innerWidth < 800 ? 64 : 90 },
            (ids) => new MateLine(this, ids, selectable),
        );
    }

    public load(mates: number[], votedMates: number[] = []) {
        this.drawingMates = mates;
        this.votedMates = votedMates;

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
    }

    public maxSelect() {
        this.selectedMateIds = [];
        let count = 0;
        for (const mateId of this.drawingMates) {
            if (this.votedMates.includes(mateId) !== true) {
                this.selectedMateIds.push(mateId);
                count += 1;
                if (count === 50) {
                    break;
                }
            }
        }
        this.load(this.drawingMates, this.votedMates);
        this.fireEvent("selectMate");
    }

    public deselect() {
        this.selectedMateIds = [];
        this.load(this.drawingMates, this.votedMates);
        this.fireEvent("selectMate");
    }
}
