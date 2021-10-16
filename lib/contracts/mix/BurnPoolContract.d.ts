import { BigNumber } from "@ethersproject/bignumber";
import Contract from "../Contract";
declare class BurnPoolContract extends Contract {
    constructor();
    getPoolId(): Promise<BigNumber>;
    burn(): Promise<void>;
}
declare const _default: BurnPoolContract;
export default _default;
//# sourceMappingURL=BurnPoolContract.d.ts.map