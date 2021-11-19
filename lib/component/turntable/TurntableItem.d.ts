import { DomNode } from "@hanul/skynode";
import { TurntableInfo } from "../../contracts/turntable/TurntablesContract";
export default class TurntableItem extends DomNode {
    private id;
    private claimableDisplay;
    constructor(id: number, currentBlock: number, info: TurntableInfo, showMix?: boolean);
    private loadClaimable;
}
//# sourceMappingURL=TurntableItem.d.ts.map