import { DomNode } from "@hanul/skynode";
import TurntableKIP7ListenersContract from "../../contracts/turntable/TurntableKIP7ListenersContract";
export default class LPTokenListeners extends DomNode {
    private contract;
    private turntableId;
    private poolId;
    private lpPoolId;
    constructor(name: string, contract: TurntableKIP7ListenersContract, turntableId: number, poolId: number, lpPoolId: number);
    private load;
}
//# sourceMappingURL=LPTokenListeners.d.ts.map