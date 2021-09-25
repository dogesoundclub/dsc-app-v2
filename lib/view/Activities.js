"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Activities {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("ACTIVITIES_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".activities-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("ACTIVITIES_TITLE")), (0, skynode_1.el)("section", (0, skynode_1.el)("p", (0, msg_js_1.default)("ACTIVITIES_SECTION_1"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, skynode_1.el)("a", (0, msg_js_1.default)("ACTIVITIES_SECTION_2_TITLE"), {
            click: () => ViewUtil_1.default.go("/dogesounds"),
        })), (0, skynode_1.el)("p", (0, msg_js_1.default)("ACTIVITIES_SECTION_2")))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Activities;
//# sourceMappingURL=Activities.js.map