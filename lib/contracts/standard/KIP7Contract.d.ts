import { BigNumber, BigNumberish, ContractInterface } from "ethers";
import Contract from "../Contract";
export default abstract class KIP7Contract extends Contract {
    constructor(address: string, abi: ContractInterface);
    getName(): Promise<string>;
    getTotalSupply(): Promise<BigNumber>;
    balanceOf(owner: string): Promise<BigNumber>;
    allowance(owner: string, spender: string): Promise<BigNumber>;
    transfer(to: string, amount: BigNumberish): Promise<void>;
    transferFrom(from: string, to: string, amount: BigNumberish): Promise<void>;
    approve(spender: string, amount: BigNumberish): Promise<void>;
    getTransferEvents(to: string, startBlock: number, endBlock: number): Promise<any>;
}
//# sourceMappingURL=KIP7Contract.d.ts.map