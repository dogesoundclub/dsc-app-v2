import { BigNumberish } from "@ethersproject/bignumber";
import KIP7StakingPoolContract from "./KIP7StakingPoolContract";
declare class DevFundPoolContract extends KIP7StakingPoolContract {
    constructor();
    stake(amount: BigNumberish): Promise<void>;
}
declare const _default: DevFundPoolContract;
export default _default;
//# sourceMappingURL=DevFundPoolContract.d.ts.map