"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../../Config"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const DevFundTokenContract_1 = __importDefault(require("./DevFundTokenContract"));
const KIP7StakingPoolContract_1 = __importDefault(require("./KIP7StakingPoolContract"));
class DevFundPoolContract extends KIP7StakingPoolContract_1.default {
    constructor() {
        super(Config_1.default.contracts.DevFundPool);
    }
    async stake(amount) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await DevFundTokenContract_1.default.allowance(owner, this.address)).lt(amount)) {
                await DevFundTokenContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
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
}
exports.default = new DevFundPoolContract();
//# sourceMappingURL=DevFundPoolContract.js.map