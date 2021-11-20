"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const KlayMIXLPTokenContract_1 = __importDefault(require("../mix/KlayMIXLPTokenContract"));
const TurntableKIP7ListenersContract_1 = __importDefault(require("./TurntableKIP7ListenersContract"));
class KlayMIXListenersContract extends TurntableKIP7ListenersContract_1.default {
    constructor() {
        super(Config_1.default.contracts.KlayMIXListeners);
    }
    get lpToken() {
        return KlayMIXLPTokenContract_1.default;
    }
}
exports.default = new KlayMIXListenersContract();
//# sourceMappingURL=KlayMIXListenersContract.js.map