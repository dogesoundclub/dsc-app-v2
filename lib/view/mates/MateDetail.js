"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
class MateDetail {
    constructor(params) {
        Layout_1.default.current.title = (0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".matedetail-view"));
    }
    changeParams(params, uri) {
        Layout_1.default.current.title = (0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
    }
    close() {
        this.container.delete();
    }
}
exports.default = MateDetail;
//# sourceMappingURL=MateDetail.js.map