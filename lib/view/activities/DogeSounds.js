"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const RankList_1 = __importDefault(require("../../component/dogesounds/RankList"));
const Layout_1 = __importDefault(require("../Layout"));
class DogeSounds {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("DOGESOUNDS_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".dogesounds-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("DOGESOUNDS_TITLE")), (0, skynode_1.el)("img.top-image", {
            src: "/images/view/dogesounds/top.png",
            srcset: "/images/view/dogesounds/top@2x.png 2x",
        }), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DOGESOUNDS_RULE_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_RULE_1")), (0, skynode_1.el)("p.warning", `* ${(0, msg_js_1.default)("DOGESOUNDS_RULE_WARNING")}`), (0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_RULE_2"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DOGESOUNDS_WINNERS_TITLE")), new RankList_1.default()), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DOGESOUNDS_STATUS_TITLE")))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = DogeSounds;
//# sourceMappingURL=DogeSounds.js.map