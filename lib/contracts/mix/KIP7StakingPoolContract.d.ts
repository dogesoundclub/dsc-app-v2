import { BigNumber, BigNumberish, ContractInterface } from "ethers";
import Contract from "../Contract";
export default abstract class KIP7StakingPoolContract extends Contract {
    constructor(address: string, abi: ContractInterface);
    shares(owner: string): Promise<BigNumber>;
    claimableOf(owner: string): Promise<BigNumber>;
    unstake(amount: BigNumberish): Promise<void>;
    claim(): Promise<void>;
}
//# sourceMappingURL=KIP7StakingPoolContract.d.ts.map