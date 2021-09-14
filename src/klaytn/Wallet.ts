import EventContainer from "eventcontainer";
import ConnectWalletPopup from "../ui/ConnectWalletPopup";
import ExtWallet from "./ExtWallet";
import Klip from "./Klip";

class Wallet extends EventContainer {

    constructor() {
        super();
        this.checkConnected();
    }

    private async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }

    public async loadAddress(): Promise<string | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.loadAddress();
        } else {
            return Klip.address;
        }
    }

    public async connected() {
        return await this.loadAddress() !== undefined;
    }

    public async connect() {
        if (ExtWallet.installed === true) {
            return await ExtWallet.connect();
        } else {
            return new ConnectWalletPopup();
        }
    }
}

export default new Wallet();
