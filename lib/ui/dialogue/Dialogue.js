"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
class Dialogue extends skynode_1.Popup {
    constructor(tag, message, confirmTitle, confirm) {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(`.dialogue${tag}`, (0, skynode_1.el)("p", message), this.main = (0, skynode_1.el)("main"), (0, skynode_1.el)("a.cancel-button", (0, msg_js_1.default)("CANCEL_BUTTON"), {
            click: () => this.delete(),
        }), (0, skynode_1.el)("a.confirm-button", confirmTitle, {
            click: () => {
                confirm();
                this.delete();
            },
        })));
    }
}
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map