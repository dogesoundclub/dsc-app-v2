import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
declare class MatesListenersContract extends Contract {
    constructor();
    listening(mateId: BigNumberish): Promise<boolean>;
    listeningTo(mateId: BigNumberish): Promise<BigNumber>;
    listeners(turntableId: BigNumberish, index: BigNumberish): Promise<BigNumber>;
    listenerCount(turntableId: BigNumberish): Promise<BigNumber>;
    totalShares(): Promise<BigNumber>;
    claimableOf(turntableId: BigNumberish, mateId: BigNumberish): Promise<BigNumber>;
    listen(turntableId: BigNumberish, mateIds: BigNumberish[]): Promise<void>;
    unlisten(turntableId: BigNumberish, mateIds: BigNumberish[]): Promise<void>;
    claim(turntableId: BigNumberish, mateIds: BigNumberish[]): Promise<void>;
}
declare const _default: MatesListenersContract;
export default _default;
//# sourceMappingURL=MatesListenersContract.d.ts.map