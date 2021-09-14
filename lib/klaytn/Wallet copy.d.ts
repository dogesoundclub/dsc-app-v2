import EventContainer from "eventcontainer";
declare class Wallet extends EventContainer {
    private klaytn;
    private caver;
    constructor();
    private checkConnected;
    loadAddress(): Promise<string | undefined>;
    loadChainId(): Promise<any>;
    loadBlockNumber(): Promise<any>;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
    createContract(address: string, abi: any): any;
}
declare const _default: Wallet;
export default _default;
//# sourceMappingURL=Wallet%20copy.d.ts.map