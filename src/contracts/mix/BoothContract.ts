import { BigNumberish } from "@ethersproject/bignumber";
import { constants } from "ethers";
import Config from "../../Config";
import Wallet from "../../klaytn/Wallet";
import KIP7Contract from "../standard/KIP7Contract";
import MixContract from "./MixContract";

class BoothContract extends KIP7Contract {

    constructor() {
        super(Config.contracts.Booth, require("./BoothContractABI.json"));
    }

    public async stake(amount: BigNumberish) {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract.allowance(owner, this.address)).lt(amount)) {
                await MixContract.approve(this.address, constants.MaxUint256);
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

    public async unstake(amount: BigNumberish) {
        await this.runWalletMethod("unstake", amount);
    }

    public async getStakeEvents(startBlock: number, endBlock: number) {
        const events = await this.contract.getPastEvents("Stake", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }
}

export default new BoothContract();
