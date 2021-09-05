import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Contract from "./Contract";

class MateContract extends Contract {

    constructor() {
        super(Config.contracts.Mate, require("./MateContractABI.json"));
    }

    public async ownerOf(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.ownerOf(mateId).call();
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.balanceOf(owner).call());
    }

    public async tokenOfOwnerByIndex(owner: string, index: number): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.tokenOfOwnerByIndex(owner, index).call());
    }
}

export default new MateContract();
