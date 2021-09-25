"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Governance {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("GOVERNANCE_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("GOVERNANCE_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("GOVERNANCE_DESCRIPTION")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("GOVERNANCE_PROPOSALS")), (0, skynode_1.el)("a.propose-button", (0, msg_js_1.default)("GOVERNANCE_PROPOSE_BUTTON"), {
            click: () => ViewUtil_1.default.go("/governance/propose"),
        }))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Governance;
//# sourceMappingURL=Governance.js.map