import { DomNode } from "@hanul/skynode";
import MatesTab from "./MatesTab";
export default class MateItem extends DomNode {
    private tab;
    private id;
    private mixAmount;
    private claimable;
    private refreshInterval;
    constructor(tab: MatesTab, id: number, name: string | undefined);
    private load;
    delete(): void;
}
//# sourceMappingURL=MateItem.d.ts.map