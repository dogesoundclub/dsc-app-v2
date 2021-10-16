"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("./Layout"));
class Mix {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("MIX_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mix-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MIX_TITLE")), (0, skynode_1.el)("p", "MIX는 NFT 프로젝트들의 허브를 위한 토큰입니다. DSC 사이트의 전 범위에서 사용되며, Klayswap에서 유동성 공급 및 거래에 사용될 예정입니다. 또한 MIX를 활용한 기능을 추가하기로 약속한 파트너 프로젝트의 서비스에서도 사용될 예정입니다."), (0, skynode_1.el)("a", "MIX 백서 보기", { href: "https://medium.com/dogesoundclub/dsc-mix-nft-%ED%97%88%EB%B8%8C%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%86%A0%ED%81%B0-3299dd3a8d1d", target: "_blank" })));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Mix;
//# sourceMappingURL=Mix.js.map