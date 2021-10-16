import { BigNumberish } from "@ethersproject/bignumber";
import KIP7Contract from "../standard/KIP7Contract";
declare class BoothContract extends KIP7Contract {
    constructor();
    stake(amount: BigNumberish): Promise<void>;
    unstake(amount: BigNumberish): Promise<void>;
    getStakeEvents(startBlock: number, endBlock: number): Promise<any>;
}
declare const _default: BoothContract;
export default _default;
//# sourceMappingURL=BoothContract.d.ts.map