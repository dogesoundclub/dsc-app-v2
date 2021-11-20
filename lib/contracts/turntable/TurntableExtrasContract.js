"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
class TurntableExtrasContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.TurntableExtras, require("./TurntableExtrasContractABI.json"));
    }
    async extras(turntableId) {
        return await this.runMethod("extras", turntableId);
    }
    async set(turntableId, extra) {
        await this.runWalletMethod("set", turntableId, extra);
    }
}
exports.default = new TurntableExtrasContract();
//# sourceMappingURL=TurntableExtrasContract.js.map