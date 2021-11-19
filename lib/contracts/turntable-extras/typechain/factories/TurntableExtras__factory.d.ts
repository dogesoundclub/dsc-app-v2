import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TurntableExtras } from "../TurntableExtras";
export declare class TurntableExtras__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_turntables: string, overrides?: Overrides): Promise<TurntableExtras>;
    getDeployTransaction(_turntables: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): TurntableExtras;
    connect(signer: Signer): TurntableExtras__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TurntableExtras;
}
//# sourceMappingURL=TurntableExtras__factory.d.ts.map