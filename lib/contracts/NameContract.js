"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Contract_1 = __importDefault(require("./Contract"));
class NameContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Name, require("./NameContractABI.json"));
    }
    async set(mateId, name) {
        await this.runWalletMethod("set", mateId, name);
    }
    async recordCount(mateId) {
        return ethers_1.BigNumber.from(await this.runMethod("recordCount", mateId));
    }
    async record(mateId, index) {
        const result = await this.runMethod("record", mateId, index);
        return {
            owner: result[0],
            name: result[1],
            blockNumber: result[2],
        };
    }
    async exists(name) {
        return await this.runMethod("exists", name);
    }
    async getName(mateId) {
        return await this.runMethod("getName", mateId);
    }
}
exports.default = new NameContract();
//# sourceMappingURL=NameContract.js.map