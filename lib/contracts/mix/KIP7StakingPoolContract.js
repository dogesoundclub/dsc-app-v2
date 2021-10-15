"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
class DevFundPoolContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.DevFundPool, require("./KIP7StakingPoolContractABI.json"));
    }
}
exports.default = new DevFundPoolContract();
//# sourceMappingURL=KIP7StakingPoolContract.js.map