"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Contract_1 = __importDefault(require("../Contract"));
class KlayswapKlayMixContract extends Contract_1.default {
    constructor() {
        super("0xa50cec0216c1cee6f90c7d5359444d46315279bd", require("./KlayswapKlayMixContractABI.json"));
    }
    async getTokenA() {
        return await this.runMethod("tokenA");
    }
    async getTokenB() {
        return await this.runMethod("tokenB");
    }
    async getCurrentPool() {
        const results = await this.runMethod("getCurrentPool");
        return {
            a: bignumber_1.BigNumber.from(results[0]),
            b: bignumber_1.BigNumber.from(results[1]),
        };
    }
}
exports.default = new KlayswapKlayMixContract();
//# sourceMappingURL=KlayswapKlayMixContract.js.map