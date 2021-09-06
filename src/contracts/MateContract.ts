import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
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

    public async transfer(to: string, mateId: BigNumberish) {
        const register = await Wallet.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.transferFrom(register, to, mateId).send({ from: register, gas: 1500000 });
    }
}

export default new MateContract();
