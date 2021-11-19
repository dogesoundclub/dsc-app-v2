import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
declare class KSPMIXListenersContract extends Contract {
    constructor();
    shares(turntableId: BigNumberish, owner: string): Promise<BigNumber>;
}
declare const _default: KSPMIXListenersContract;
export default _default;
//# sourceMappingURL=KSPMIXListenersContract.d.ts.map