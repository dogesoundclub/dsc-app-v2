import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { KlipSigner, KlipSignerInterface } from "../KlipSigner";
export declare class KlipSigner__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<KlipSigner>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): KlipSigner;
    connect(signer: Signer): KlipSigner__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061020d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80631189f4d51461003b57806379d6348d146100fd575b600080fd5b6100e16004803603602081101561005157600080fd5b81019060208101813564010000000081111561006c57600080fd5b82018360208201111561007e57600080fd5b803590602001918460018302840111640100000000831117156100a057600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061016f945050505050565b604080516001600160a01b039092168252519081900360200190f35b61016d6004803603602081101561011357600080fd5b81019060208101813564010000000081111561012e57600080fd5b82018360208201111561014057600080fd5b8035906020019184600183028401116401000000008311171561016257600080fd5b509092509050610195565b005b80516020818301810180516000825292820191909301209152546001600160a01b031681565b3360008383604051808383808284379190910194855250506040519283900360200190922080546001600160a01b03949094166001600160a01b0319909416939093179092555050505056fea165627a7a723058209812cebb3b32e8c1bf746b3c4f11a8634ccb55e321dcaae693a45be9b50bcb0a0029";
    static readonly abi: {
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): KlipSignerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): KlipSigner;
}
//# sourceMappingURL=KlipSigner__factory.d.ts.map