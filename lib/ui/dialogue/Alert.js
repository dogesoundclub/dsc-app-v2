"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dialogue_1 = __importDefault(require("./Dialogue"));
class Alert extends Dialogue_1.default {
    constructor(message, confirmTitle, confirm) {
        super(".alert", message, confirmTitle, () => {
            if (confirm !== undefined) {
                confirm();
            }
        });
    }
}
exports.default = Alert;
//# sourceMappingURL=Alert.js.map