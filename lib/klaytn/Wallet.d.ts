import EventContainer from "eventcontainer";
declare class Wallet extends EventContainer {
    constructor();
    private checkConnected;
    loadAddress(): Promise<string | undefined>;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
    signMessage(message: string): Promise<{
        signedMessage?: string;
        klipSignKey?: string;
    }>;
}
declare const _default: Wallet;
export default _default;
//# sourceMappingURL=Wallet.d.ts.map