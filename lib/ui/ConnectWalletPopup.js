"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const klip = require("klip-sdk");
class ConnectWalletPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".connect-wallet-popup", (0, skynode_1.el)("img.talker", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-1.png" }), (0, skynode_1.el)("p", (0, msg_js_1.default)("CONNECT_WALLET_POPUP_DESCRIPTION")), (0, skynode_1.el)("a.button.connect-kaikas-button", (0, skynode_1.el)("img", { src: "/images/logo/kaikas.svg" }), (0, msg_js_1.default)("CONNECT_KAIKAS_BUTTON"), {
            click: () => { },
        }), (0, skynode_1.el)("a.button.connect-klip-button", (0, skynode_1.el)("img", { src: "/images/logo/klip.svg" }), (0, msg_js_1.default)("CONNECT_KLIP_BUTTON"), {
            click: async () => {
                const result = await klip.prepare.auth({ bappName: "도지사운드클럽" });
                klip.request(result.request_key, () => alert('모바일 환경에서 실행해주세요'));
                setTimeout(async () => {
                    const a = await klip.getResult(result.request_key);
                    console.log(alert(JSON.stringify(a)));
                }, 5000);
            },
        }), (0, skynode_1.el)("a.button.cancel-button", (0, msg_js_1.default)("CANCEL_CONNECT_BUTTON"), {
            click: () => this.delete(),
        })));
    }
}
exports.default = ConnectWalletPopup;
//# sourceMappingURL=ConnectWalletPopup.js.map