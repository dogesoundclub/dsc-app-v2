"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const KSPMIXLPTokenContract_1 = __importDefault(require("../mix/KSPMIXLPTokenContract"));
const TurntableKIP7ListenersContract_1 = __importDefault(require("./TurntableKIP7ListenersContract"));
class KSPMIXListenersContract extends TurntableKIP7ListenersContract_1.default {
    constructor() {
        super(Config_1.default.contracts.KSPMIXListeners);
    }
    get lpToken() {
        return KSPMIXLPTokenContract_1.default;
    }
}
exports.default = new KSPMIXListenersContract();
//# sourceMappingURL=KSPMIXListenersContract.js.map