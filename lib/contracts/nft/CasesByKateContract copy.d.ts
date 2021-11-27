import { BigNumber, BigNumberish } from "ethers";
import Contract from "../Contract";
declare class CasesByKateContract extends Contract {
    constructor();
    ownerOf(mateId: BigNumberish): Promise<string>;
    balanceOf(owner: string): Promise<BigNumber>;
    tokenOfOwnerByIndex(owner: string, index: number): Promise<BigNumber>;
    transfer(to: string, mateId: BigNumberish): Promise<void>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
    setApprovalForAll(operator: string, approved: boolean): Promise<void>;
}
declare const _default: CasesByKateContract;
export default _default;
//# sourceMappingURL=CasesByKateContract%20copy.d.ts.map