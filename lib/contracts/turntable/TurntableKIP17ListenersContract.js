"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Contract_1 = __importDefault(require("../Contract"));
class TurntableKIP7ListenersContract extends Contract_1.default {
    constructor(address) {
        super(address, require("./TurntableKIP7ListenersContractABI.json"));
    }
    async shares(turntableId, owner) {
        return bignumber_1.BigNumber.from(await this.runMethod("shares", turntableId, owner));
    }
}
exports.default = TurntableKIP7ListenersContract;
//# sourceMappingURL=TurntableKIP17ListenersContract.js.map