"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../../Config"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const KIP7Contract_1 = __importDefault(require("../standard/KIP7Contract"));
const MixContract_1 = __importDefault(require("./MixContract"));
class BoothContract extends KIP7Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Booth, require("./BoothContractABI.json"));
    }
    async stake(amount) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(amount)) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("stake", amount);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("stake", amount);
            }
        }
    }
    async unstake(amount) {
        await this.runWalletMethod("unstake", amount);
    }
    async getStakeEvents(startBlock, endBlock) {
        const events = await this.contract.getPastEvents("Stake", {
            fromBlock: startBlock,
            toBlock: endBlock,
        });
        return events;
    }
}
exports.default = new BoothContract();
//# sourceMappingURL=BoothContract.js.map