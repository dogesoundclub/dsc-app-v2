"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class BuyTurntable {
    constructor() {
        Layout_1.default.current.title = "턴테이블 구매";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".buy-turntable-view", (0, skynode_1.el)("h1", "턴테이블 구매")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = BuyTurntable;
//# sourceMappingURL=BuyTurntable.js.map