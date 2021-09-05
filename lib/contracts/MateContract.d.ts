import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class MateContract extends Contract {
    constructor();
    ownerOf(mateId: BigNumberish): Promise<string>;
    balanceOf(owner: string): Promise<BigNumber>;
    tokenOfOwnerByIndex(owner: string, index: number): Promise<BigNumber>;
}
declare const _default: MateContract;
export default _default;
//# sourceMappingURL=MateContract.d.ts.map