import msg from "msg.js";
import Alert from "../ui/dialogue/Alert";

const klipSDK = require("klip-sdk");

class Klip {

    public address: undefined | string;

    private async request(res: any): Promise<any> {
        klipSDK.request(res.request_key, () => new Alert(msg("CONNECT_KLIP_NEEDS_MOBILE"), msg("CONFIRM_BUTTON")));
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

    public async auth() {
        const res = await klipSDK.prepare.auth({ bappName: msg("BAPP_TITLE") });
        this.address = (await this.request(res)).klaytn_address;
    }
}

export default new Klip();
