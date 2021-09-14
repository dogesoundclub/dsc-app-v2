import EventContainer from "eventcontainer";
import ConnectWalletPopup from "../ui/ConnectWalletPopup";
declare class Wallet extends EventContainer {
    constructor();
    private checkConnected;
    loadAddress(): Promise<string | undefined>;
    connected(): Promise<boolean>;
    connect(): Promise<void | ConnectWalletPopup>;
}
declare const _default: Wallet;
export default _default;
//# sourceMappingURL=Wallet.d.ts.map