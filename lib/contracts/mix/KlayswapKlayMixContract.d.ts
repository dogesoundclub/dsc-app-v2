import { BigNumber } from "@ethersproject/bignumber";
import Contract from "../Contract";
declare class KlayswapKlayMixContract extends Contract {
    constructor();
    getTokenA(): Promise<string>;
    getTokenB(): Promise<string>;
    getCurrentPool(): Promise<{
        a: BigNumber;
        b: BigNumber;
    }>;
}
declare const _default: KlayswapKlayMixContract;
export default _default;
//# sourceMappingURL=KlayswapKlayMixContract.d.ts.map