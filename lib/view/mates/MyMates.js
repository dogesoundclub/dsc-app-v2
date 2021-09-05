"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
class MyMates {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("MY_MATES_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mymates-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MY_MATES_TITLE"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyMates;
//# sourceMappingURL=MyMates.js.map