"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../ui/dialogue/Alert"));
const klipSDK = require("klip-sdk");
class Klip {
    async request(res) {
        klipSDK.request(res.request_key, () => new Alert_1.default((0, msg_js_1.default)("CONNECT_KLIP_NEEDS_MOBILE"), (0, msg_js_1.default)("CONFIRM_BUTTON")));
        return new Promise((resolve) => {
            const interval = setInterval(async () => {
                const result = await klipSDK.getResult(res.request_key);
                if (result.result !== undefined) {
                    clearInterval(interval);
                    resolve(result.result);
                }
            }, 1000);
        });
    }
    async auth() {
        const res = await klipSDK.prepare.auth({ bappName: (0, msg_js_1.default)("BAPP_TITLE") });
        this.address = (await this.request(res)).klaytn_address;
    }
}
exports.default = new Klip();
//# sourceMappingURL=Klip.js.map