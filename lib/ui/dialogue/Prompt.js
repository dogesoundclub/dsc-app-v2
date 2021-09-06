"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Dialogue_1 = __importDefault(require("./Dialogue"));
class Prompt extends Dialogue_1.default {
    constructor(message, confirmTitle, confirm) {
        super(".prompt", message, confirmTitle, () => {
            confirm(this.input.domElement.value);
        });
        this.main.append(this.input = (0, skynode_1.el)("input.input"));
    }
}
exports.default = Prompt;
//# sourceMappingURL=Prompt.js.map