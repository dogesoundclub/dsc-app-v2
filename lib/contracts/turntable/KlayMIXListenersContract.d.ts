import { BigNumberish } from "@ethersproject/bignumber";
import TurntableKIP7ListenersContract from "./TurntableKIP7ListenersContract";
declare class KlayMIXListenersContract extends TurntableKIP7ListenersContract {
    constructor();
    get lpTokenAddress(): string;
    listen(turntableId: BigNumberish, amount: BigNumberish): Promise<void>;
}
declare const _default: KlayMIXListenersContract;
export default _default;
//# sourceMappingURL=KlayMIXListenersContract.d.ts.map