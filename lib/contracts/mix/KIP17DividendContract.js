"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Contract_1 = __importDefault(require("../Contract"));
class KIP17DividendContract extends Contract_1.default {
    constructor(address, abi) {
        super(address, abi === undefined ? require("./KIP17DividendContractABI.json") : abi);
    }
    async claimableOf(id) {
        return ethers_1.BigNumber.from(await this.runMethod("claimableOf", id));
    }
    async claim(ids) {
        if (ids.length <= 50) {
            await this.runWalletMethod("claim", ids);
        }
        else if (ids.length <= 500) {
            await this.runWalletMethodWithLargeGas("claim", ids);
        }
        else {
            await this.runWalletMethodWithLargeGas("claim", ids.slice(0, 500));
            await this.runWalletMethodWithLargeGas("claim", ids.slice(500));
        }
    }
}
exports.default = KIP17DividendContract;
//# sourceMappingURL=KIP17DividendContract.js.map