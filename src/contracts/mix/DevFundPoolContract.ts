import { BigNumberish } from "@ethersproject/bignumber";
import { constants } from "ethers";
import Config from "../../Config";
import Wallet from "../../klaytn/Wallet";
import DevFundTokenContract from "./DevFundTokenContract";
import KIP7StakingPoolContract from "./KIP7StakingPoolContract";

class DevFundPoolContract extends KIP7StakingPoolContract {

    constructor() {
        super(Config.contracts.DevFundPool);
    }

    public async stake(amount: BigNumberish) {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await DevFundTokenContract.allowance(owner, this.address)).lt(amount)) {
                await DevFundTokenContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("stake", amount);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("stake", amount);
            }
        }
    }
}

export default new DevFundPoolContract();
