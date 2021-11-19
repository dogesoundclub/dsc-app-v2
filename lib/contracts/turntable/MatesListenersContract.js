"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
class MatesListenersContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MatesListeners, require("./TurntableKIP17ListenersContractABI.json"));
    }
    async listening(mateId) {
        return await this.runMethod("listening", mateId);
    }
    async listeningTo(mateId) {
        return bignumber_1.BigNumber.from(await this.runMethod("listeningTo", mateId));
    }
}
exports.default = new MatesListenersContract();
//# sourceMappingURL=MatesListenersContract.js.map