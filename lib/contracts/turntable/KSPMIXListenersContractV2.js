"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const KSPMIXLPTokenContract_1 = __importDefault(require("../mix/KSPMIXLPTokenContract"));
const TurntableKIP7ListenersContractV2_1 = __importDefault(require("./TurntableKIP7ListenersContractV2"));
class KSPMIXListenersContractV2 extends TurntableKIP7ListenersContractV2_1.default {
    constructor() {
        super(Config_1.default.contracts.KSPMIXListenersV2);
    }
    get lpToken() {
        return KSPMIXLPTokenContract_1.default;
    }
}
exports.default = new KSPMIXListenersContractV2();
//# sourceMappingURL=KSPMIXListenersContractV2.js.map