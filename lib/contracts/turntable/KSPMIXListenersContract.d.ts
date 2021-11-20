import { BigNumberish } from "@ethersproject/bignumber";
import TurntableKIP7ListenersContract from "./TurntableKIP7ListenersContract";
declare class KSPMIXListenersContract extends TurntableKIP7ListenersContract {
    constructor();
    get lpTokenAddress(): string;
    listen(turntableId: BigNumberish, amount: BigNumberish): Promise<void>;
}
declare const _default: KSPMIXListenersContract;
export default _default;
//# sourceMappingURL=KSPMIXListenersContract.d.ts.map