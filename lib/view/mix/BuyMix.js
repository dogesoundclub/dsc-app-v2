"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
class BuyMix {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("BUY_MIX_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".buymix-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("BUY_MIX_TITLE")), (0, skynode_1.el)("img.klayswap-logo", { src: "/images/logo/klayswap.png" }), (0, skynode_1.el)("p", "MIX는 국내 최대의 DeFi 서비스인 Klayswap에서 구매하실 수 있습니다."), (0, skynode_1.el)("a", "Klayswap에서 MIX 구매하기", { href: "https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf", target: "_blank" })));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = BuyMix;
//# sourceMappingURL=BuyMix.js.map