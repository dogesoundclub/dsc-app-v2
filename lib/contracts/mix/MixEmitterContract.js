"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
class MixEmitterContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MixEmitter, require("./MixEmitterContractABI.json"));
    }
}
exports.default = new MixEmitterContract();
//# sourceMappingURL=MixEmitterContract.js.map