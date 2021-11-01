import { BigNumber, BigNumberish } from "ethers";
import Contract from "../Contract";

export default abstract class KIP7StakingPoolContract extends Contract {

    constructor(address: string) {
        super(address, require("./KIP7StakingPoolContractABI.json"));
    }

    public async shares(owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("shares", owner));
    }

    public async claimableOf(owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("claimableOf", owner));
    }

    public async unstake(amount: BigNumberish) {
        await this.runWalletMethod("unstake", amount);
    }

    public async claim() {
        await this.runWalletMethod("claim");
    }
}
