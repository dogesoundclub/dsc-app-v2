"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const Alert_1 = __importDefault(require("../ui/dialogue/Alert"));
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const klipSDK = require("klip-sdk");
class Klip extends eventcontainer_1.default {
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
    get connected() {
        return this.address !== undefined;
    }
    async connect() {
        const res = await klipSDK.prepare.auth({ bappName: (0, msg_js_1.default)("BAPP_TITLE") });
        this.address = (await this.request(res)).klaytn_address;
        this.fireEvent("connect");
    }
    async runContractMethod(address, abi, params, value) {
        const res = await klipSDK.prepare.executeContract({
            bappName: (0, msg_js_1.default)("BAPP_TITLE"),
            to: address,
            abi: JSON.stringify(abi),
            params: JSON.stringify(params),
            value: ethers_1.utils.parseEther((value === undefined ? 0 : value).toString()).toString(),
        });
        await this.request(res);
    }
}
exports.default = new Klip();
//# sourceMappingURL=Klip.js.map