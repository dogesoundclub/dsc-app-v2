import { DomNode } from "@hanul/skynode";
import MiningMates from "../../view/turntable/MiningMates";
export default class MateItem extends DomNode {
    private view;
    private turntableId;
    private id;
    private mixAmount;
    private claimable;
    private refreshInterval;
    constructor(view: MiningMates, turntableId: number, id: number, name: string | undefined);
    private load;
    delete(): void;
}
//# sourceMappingURL=MateItem.d.ts.map