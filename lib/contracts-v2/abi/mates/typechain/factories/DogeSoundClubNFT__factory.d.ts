import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { DogeSoundClubNFT } from "../DogeSoundClubNFT";
export declare class DogeSoundClubNFT__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<DogeSoundClubNFT>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): DogeSoundClubNFT;
    connect(signer: Signer): DogeSoundClubNFT__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): DogeSoundClubNFT;
}
//# sourceMappingURL=DogeSoundClubNFT__factory.d.ts.map