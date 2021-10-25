import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { DSCNFTName } from "../DSCNFTName";
export declare class DSCNFTName__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_mix: string, overrides?: Overrides): Promise<DSCNFTName>;
    getDeployTransaction(_mix: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): DSCNFTName;
    connect(signer: Signer): DSCNFTName__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): DSCNFTName;
}
//# sourceMappingURL=DSCNFTName__factory.d.ts.map