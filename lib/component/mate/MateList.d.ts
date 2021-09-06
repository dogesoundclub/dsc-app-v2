import { ScrollableDomNode } from "@hanul/skynode";
export default class MateList extends ScrollableDomNode<number[]> {
    selectedMateIds: number[];
    votedMates: number[];
    private drawingMates;
    constructor(selectable?: boolean);
    load(mates: number[], votedMates?: number[]): void;
    maxSelect(): void;
    deselect(): void;
}
//# sourceMappingURL=MateList.d.ts.map