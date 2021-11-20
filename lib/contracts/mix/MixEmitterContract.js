"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
class MixEmitterContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MixEmitter, require("./MixEmitterContractABI.json"));
    }
    async poolCount() {
        return bignumber_1.BigNumber.from(await this.runMethod("poolCount"));
    }
    async pendingMix(pid) {
        return bignumber_1.BigNumber.from(await this.runMethod("pendingMix", pid));
    }
    async poolInfo(pid) {
        const result = await this.runMethod("poolInfo", pid);
        return {
            to: result[0],
            allocPoint: parseInt(result[1], 10),
            lastEmitBlock: parseInt(result[2], 10),
        };
    }
}
exports.default = new MixEmitterContract();
//# sourceMappingURL=MixEmitterContract.js.map