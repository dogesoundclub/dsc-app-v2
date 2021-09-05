import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
export interface NameRecord {
    owner: string;
    name: string;
    blockNumber: BigNumber;
}
declare class NameContract extends Contract {
    constructor();
    set(mateId: BigNumberish, name: string): Promise<void>;
    recordCount(mateId: BigNumberish): Promise<BigNumber>;
    record(mateId: BigNumberish, index: BigNumberish): Promise<NameRecord>;
    exists(name: string): Promise<boolean>;
    getName(mateId: BigNumberish): Promise<string>;
}
declare const _default: NameContract;
export default _default;
//# sourceMappingURL=NameContract.d.ts.map