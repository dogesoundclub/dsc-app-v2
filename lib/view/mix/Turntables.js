"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
class Turntables {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("TURNTABLES_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".turntables-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("TURNTABLES_TITLE")), (0, skynode_1.el)("p", (0, skynode_1.el)("a", "턴테이블 및 리스너 소개 및 출시 일정 보기", {
            href: "https://medium.com/dogesoundclub/%ED%84%B4%ED%85%8C%EC%9D%B4%EB%B8%94-%EB%B0%8F-%EB%A6%AC%EC%8A%A4%EB%84%88-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EC%B6%9C%EC%8B%9C-%EC%9D%BC%EC%A0%95-c0f2efe81587",
            target: "_blank",
        })), (0, skynode_1.el)(".turntable-list", (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Normal Grade", { style: { color: "#d6d6d6" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/normal.png" }), (0, skynode_1.el)(".volume", "Volume: 1,000"), (0, skynode_1.el)(".price", "Price: 1,000 MIX")), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Fine Grade", { style: { color: "#6cb2e3" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/fine.png" }), (0, skynode_1.el)(".volume", "Volume: 3,300"), (0, skynode_1.el)(".price", "Price: 3,000 MIX")), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Rare Grade", { style: { color: "#dbcf74" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/rare.png" }), (0, skynode_1.el)(".volume", "Volume: 5,500"), (0, skynode_1.el)(".price", "Price: 5,000 MIX")), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Epic Grade", { style: { color: "#f5a360" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/epic.png" }), (0, skynode_1.el)(".volume", "Volume: 8,000"), (0, skynode_1.el)(".price", "Price: 7,000 MIX")), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Supremacy Grade", { style: { color: "#e6500e" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/supremacy.png" }), (0, skynode_1.el)(".volume", "Volume: 12,000"), (0, skynode_1.el)(".price", "Price: 10,000 MIX")))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Turntables;
//# sourceMappingURL=Turntables.js.map