import EventContainer from "eventcontainer";
import Config from "../Config";
import Klaytn from "../klaytn/Klaytn";
import Wallet from "../klaytn/Wallet";

export default abstract class Contract extends EventContainer {

    protected walletContract: any | undefined;
    protected contract: any;

    constructor(public address: string, private abi: any) {
        super();
        this.contract = Klaytn.createContract(address, abi);
    }

    public async loadWalletContract() {
        if (await Wallet.loadChainId() !== Config.chainId) {
            this.fireEvent("wrongNetwork");
            console.error("Wrong Network");
        } else {
            if (await Wallet.connected() !== true) {
                await Wallet.connect();
            }
            if (this.walletContract === undefined) {
                this.walletContract = Wallet.createContract(this.address, this.abi);
            }
            return this.walletContract;
        }
    }
}
