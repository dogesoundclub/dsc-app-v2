"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const superagent_1 = __importDefault(require("superagent"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class FollowMe {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("FOLLOW_ME_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".follow-me-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("FOLLOW_ME_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("FOLLOW_ME_DESCRIPTION")), this.list = (0, skynode_1.el)("table", (0, skynode_1.el)("tr", (0, skynode_1.el)("th"), (0, skynode_1.el)("th", (0, msg_js_1.default)("FOLLOW_ME_TWITTER")), (0, skynode_1.el)("th", (0, msg_js_1.default)("FOLLOW_ME_INSTAGRAM")))), this.loading = new Loading_1.default()));
        this.load();
    }
    async load() {
        const getNamesResult = await superagent_1.default.get("https://api.dogesound.club/mate/names");
        const mateNames = getNamesResult.body;
        const getLinksResult = await superagent_1.default.get("https://api.dogesound.club/mate/links");
        const links = getLinksResult.body;
        const exists = {};
        for (const [id, link] of Object.entries(links)) {
            if ((link.twitter !== undefined || link.instagram !== undefined) &&
                exists["" + link.twitter + link.instagram] !== true) {
                this.list.append((0, skynode_1.el)("tr", (0, skynode_1.el)("td", (0, skynode_1.el)("a.mate-item", { style: { backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)` } }, (0, skynode_1.el)("span.id", `#${id}`), (0, skynode_1.el)("span.name", mateNames[id]), { click: () => ViewUtil_1.default.go(`/mates/${id}`) })), (0, skynode_1.el)("td", link.twitter === undefined ? "" : (0, skynode_1.el)("a", `@${link.twitter}`, { href: `https://twitter.com/${link.twitter}`, target: "_blank" })), (0, skynode_1.el)("td", link.instagram === undefined ? "" : (0, skynode_1.el)("a", `@${link.instagram}`, { href: `https://instagram.com/${link.instagram}`, target: "_blank" }))));
                exists["" + link.twitter + link.instagram] = true;
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