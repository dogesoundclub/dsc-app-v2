import { BigNumberish } from "@ethersproject/bignumber";
import { utils } from "ethers";
import EventContainer from "eventcontainer";
import msg from "msg.js";
import QRCode from "qrcode";
import KlipQRPopup from "../ui/KlipQRPopup";

const klipSDK = require("klip-sdk");

class Klip extends EventContainer {

    public address: undefined | string;

    private async request(res: any): Promise<any> {

        let qrPopup: KlipQRPopup | undefined;
        klipSDK.request(res.request_key, async () => {
            const qr = await QRCode.toDataURL(`https://klipwallet.com/?target=/a2a?request_key=${res.request_key}`);
            qrPopup = new KlipQRPopup(qr);
        });

        return new Promise((resolve) => {
            const interval = setInterval(async () => {
                const result = await klipSDK.getResult(res.request_key);
                if (result.result !== undefined) {
                    qrPopup?.delete();
                    clearInterval(interval);
                    resolve(result.result);
                }
            }, 1000);
        });
    }

    public get connected() {
        return this.address !== undefined;
    }

    public async connect() {
        const res = await klipSDK.prepare.auth({ bappName: msg("BAPP_TITLE") });
        this.address = (await this.request(res)).klaytn_address;
        this.fireEvent("connect");
    }

    public async runContractMethod(address: string, abi: any, params: any, value?: BigNumberish) {
        const res = await klipSDK.prepare.executeContract({
            bappName: msg("BAPP_TITLE"),
            to: address,
            abi: JSON.stringify(abi),
            params: JSON.stringify(params),
            value: utils.parseEther((value === undefined ? 0 : value).toString()).toString(),
        });
        await this.request(res);
    }
}

export default new Klip();
