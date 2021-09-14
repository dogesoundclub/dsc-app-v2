import EventContainer from "eventcontainer";
declare class ExtensionWallet extends EventContainer {
    private klaytn;
    private caver;
    constructor();
    get installed(): boolean;
    private checkConnected;
    loadAddress(): Promise<string | undefined>;
    loadChainId(): Promise<any>;
    loadBlockNumber(): Promise<any>;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
    createContract(address: string, abi: any): any;
}
declare const _default: ExtensionWallet;
export default _default;
//# sourceMappingURL=ExtensionWallet.d.ts.map