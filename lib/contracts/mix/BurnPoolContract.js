"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
class BurnPoolContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.BurnPool, require("./BurnPoolContractABI.json"));
    }
    async getPoolId() {
        return bignumber_1.BigNumber.from(await this.runMethod("pid"));
    }
    async burn() {
        await this.runWalletMethod("burn");
    }
}
exports.default = new BurnPoolContract();
//# sourceMappingURL=BurnPoolContract.js.map