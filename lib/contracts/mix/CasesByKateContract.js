"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const KIP17DividendContract_1 = __importDefault(require("./KIP17DividendContract"));
class CasesByKateContract extends KIP17DividendContract_1.default {
    constructor() {
        super(Config_1.default.contracts.CasesByKate);
    }
}
exports.default = new CasesByKateContract();
//# sourceMappingURL=CasesByKateContract.js.map