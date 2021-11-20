import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
export interface PoolInfo {
    to: string;
    allocPoint: number;
    lastEmitBlock: number;
}
declare class MixEmitterContract extends Contract {
    constructor();
    poolCount(): Promise<BigNumber>;
    pendingMix(pid: BigNumberish): Promise<BigNumber>;
    poolInfo(pid: BigNumberish): Promise<PoolInfo>;
}
declare const _default: MixEmitterContract;
export default _default;
//# sourceMappingURL=MixEmitterContract.d.ts.map