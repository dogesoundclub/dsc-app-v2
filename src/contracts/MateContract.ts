import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import Contract from "./Contract";

class MateContract extends Contract {

    constructor() {
        super(Config.contracts.Mate, require("./MateContractABI.json"));
    }

    public async ownerOf(mateId: BigNumberish): Promise<string> {
        return await this.runMethod("ownerOf", mateId);
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("balanceOf", owner));
    }

    public async tokenOfOwnerByIndex(owner: string, index: number): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("tokenOfOwnerByIndex", owner, index));
    }

    public async transfer(to: string, mateId: BigNumberish) {
        await this.runWalletMethod("transferFrom", await Wallet.loadAddress(), to, mateId);
    }
}

export default new MateContract();
