"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Contract_1 = __importDefault(require("../Contract"));
class KIP7StakingPoolContract extends Contract_1.default {
    constructor(address) {
        super(address, require("./KIP7StakingPoolContractABI.json"));
    }
    async shares(owner) {
        return ethers_1.BigNumber.from(await this.runMethod("shares", owner));
    }
    async claimableOf(owner) {
        return ethers_1.BigNumber.from(await this.runMethod("claimableOf", owner));
    }
    async unstake(amount) {
        await this.runWalletMethod("unstake", amount);
    }
    async claim() {
        await this.runWalletMethod("claim");
    }
}
exports.default = KIP7StakingPoolContract;
//# sourceMappingURL=KIP7StakingPoolContract.js.map