"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../../Layout"));
const ViewUtil_1 = __importDefault(require("../../ViewUtil"));
class Detail {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("GOVERNANCE_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-detail-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("GOVERNANCE_TITLE")), (0, skynode_1.el)("a.back-button", `< ${(0, msg_js_1.default)("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
            click: () => ViewUtil_1.default.go("/governance"),
        })));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map