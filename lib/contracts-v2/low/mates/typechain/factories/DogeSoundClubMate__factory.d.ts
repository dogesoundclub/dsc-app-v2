import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { DogeSoundClubMate } from "../DogeSoundClubMate";
export declare class DogeSoundClubMate__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<DogeSoundClubMate>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): DogeSoundClubMate;
    connect(signer: Signer): DogeSoundClubMate__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): DogeSoundClubMate;
}
//# sourceMappingURL=DogeSoundClubMate__factory.d.ts.map