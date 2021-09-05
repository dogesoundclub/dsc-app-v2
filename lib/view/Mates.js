"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("./Layout"));
class Mates {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("MATES_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mates-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MATES_TITLE")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATES_SECTION_1_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATES_SECTION_1"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATES_SECTION_2_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATES_SECTION_2"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATES_SECTION_3_TITLE")), (0, skynode_1.el)("a.all", { href: "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png", target: "_blank" }, (0, skynode_1.el)("img", { src: "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png" })), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATES_SECTION_3")), (0, skynode_1.el)("a", { href: "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png", target: "_blank" }, "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Mates;
//# sourceMappingURL=Mates.js.map