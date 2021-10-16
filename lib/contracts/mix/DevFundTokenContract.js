"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const KIP7Contract_1 = __importDefault(require("../standard/KIP7Contract"));
class DevFundTokenContract extends KIP7Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.DevFundToken, require("./DevFundTokenContractABI.json"));
    }
}
exports.default = new DevFundTokenContract();
//# sourceMappingURL=DevFundTokenContract.js.map