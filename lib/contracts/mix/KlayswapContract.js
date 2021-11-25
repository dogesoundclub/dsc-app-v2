"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
const MixPriceEstimatorContract_1 = __importDefault(require("./MixPriceEstimatorContract"));
class KlayswapContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Klayswap, require("./KlayswapContractABI.json"));
    }
    async buyMix(amount) {
        const klay = await MixPriceEstimatorContract_1.default.estimatePos(amount);
        await this.runWalletMethodWithValue(klay, "exchangeKlayPos", "0xDd483a970a7A7FeF2B223C3510fAc852799a88BF", amount.mul(99).div(100), []);
    }
}
exports.default = new KlayswapContract();
//# sourceMappingURL=KlayswapContract.js.map