"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const MateInfoContract_1 = __importDefault(require("../../contracts/MateInfoContract"));
const Layout_1 = __importDefault(require("../Layout"));
const superagent_1 = __importDefault(require("superagent"));
class FollowMe {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("FOLLOW_ME_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".follow-me-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("FOLLOW_ME_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("FOLLOW_ME_DESCRIPTION")), this.list = (0, skynode_1.el)("table", (0, skynode_1.el)("tr", (0, skynode_1.el)("th"), (0, skynode_1.el)("th", (0, msg_js_1.default)("FOLLOW_ME_TWITTER")), (0, skynode_1.el)("th", (0, msg_js_1.default)("FOLLOW_ME_INSTAGRAM")))), this.loading = new Loading_1.default()));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.get("https://api.dogesound.club/mate/names");
        const mateNames = result.body;
        const links = await MateInfoContract_1.default.links();
        for (const [id, link] of links.entries()) {
            if (link.twitter !== "" || link.instagram !== "") {
                this.list.append((0, skynode_1.el)("tr", (0, skynode_1.el)("td", (0, skynode_1.el)(".mate-item", { style: { backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)` } }, (0, skynode_1.el)("span.id", `#${id}`), (0, skynode_1.el)("span.name", mateNames[id]))), (0, skynode_1.el)("td", link.twitter === "" ? "" : (0, skynode_1.el)("a", `@${link.twitter}`, { href: `https://twitter.com/${link.twitter}`, target: "_blank" })), (0, skynode_1.el)("td", link.instagram === "" ? "" : (0, skynode_1.el)("a", `@${link.instagram}`, { href: `https://instagram.com/${link.instagram}`, target: "_blank" }))));
            }
        }
        this.loading?.delete();
        this.loading = undefined;
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = FollowMe;
//# sourceMappingURL=FollowMe.js.map