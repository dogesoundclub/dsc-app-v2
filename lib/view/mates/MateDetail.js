"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const NameContract_1 = __importDefault(require("../../contracts/NameContract"));
const Layout_1 = __importDefault(require("../Layout"));
class MateDetail {
    constructor(params) {
        this.id = parseInt(params.id, 10);
        Layout_1.default.current.title = (0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".matedetail-view", this.nameDisplay = (0, skynode_1.el)("h1"), (0, skynode_1.el)("img.mate-image", { src: `https://storage.googleapis.com/dsc-mate/336/dscMate-${this.id}.png` }), (0, skynode_1.el)("a.opensea-button", (0, msg_js_1.default)("MATE_DETAIL_OPENSEA_BUTTON"), { href: `https://opensea.io/assets/klaytn/0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae/${this.id}` })));
        this.loadName();
    }
    async loadName() {
        this.nameDisplay.appendText((0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id)));
        const name = await NameContract_1.default.getName(this.id);
        if (name !== "") {
            this.nameDisplay.appendText(` - ${await NameContract_1.default.getName(this.id)}`);
        }
    }
    changeParams(params, uri) {
        Layout_1.default.current.title = (0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
    }
    close() {
        this.container.delete();
    }
}
exports.default = MateDetail;
//# sourceMappingURL=MateDetail.js.map