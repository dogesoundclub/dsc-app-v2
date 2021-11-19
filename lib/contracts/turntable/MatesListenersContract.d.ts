import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
declare class MatesListenersContract extends Contract {
    constructor();
    listening(mateId: BigNumberish): Promise<boolean>;
    listeningTo(mateId: BigNumberish): Promise<BigNumber>;
}
declare const _default: MatesListenersContract;
export default _default;
//# sourceMappingURL=MatesListenersContract.d.ts.map