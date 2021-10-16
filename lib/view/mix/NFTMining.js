"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Layout_1 = __importDefault(require("../Layout"));
class NFTMining {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("NFT_MINING_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".nftmining-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("NFT_MINING_TITLE")), (0, skynode_1.el)("p", "아래 NFT를 보유하고 있으면 MIX를 분배받게 됩니다. NFT 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다.")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = NFTMining;
//# sourceMappingURL=NFTMining.js.map