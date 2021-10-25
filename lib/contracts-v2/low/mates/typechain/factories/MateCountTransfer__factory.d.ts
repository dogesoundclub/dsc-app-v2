import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MateCountTransfer } from "../MateCountTransfer";
export declare class MateCountTransfer__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_mate: string, overrides?: Overrides): Promise<MateCountTransfer>;
    getDeployTransaction(_mate: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): MateCountTransfer;
    connect(signer: Signer): MateCountTransfer__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MateCountTransfer;
}
//# sourceMappingURL=MateCountTransfer__factory.d.ts.map