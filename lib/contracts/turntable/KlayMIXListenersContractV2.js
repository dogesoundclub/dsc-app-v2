"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const KlayMIXLPTokenContract_1 = __importDefault(require("../mix/KlayMIXLPTokenContract"));
const TurntableKIP7ListenersContractV2_1 = __importDefault(require("./TurntableKIP7ListenersContractV2"));
class KlayMIXListenersContractV2 extends TurntableKIP7ListenersContractV2_1.default {
    constructor() {
        super(Config_1.default.contracts.KlayMIXListenersV2);
    }
    get lpToken() {
        return KlayMIXLPTokenContract_1.default;
    }
}
exports.default = new KlayMIXListenersContractV2();
//# sourceMappingURL=KlayMIXListenersContractV2.js.map