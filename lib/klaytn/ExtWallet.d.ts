import { BigNumber } from "@ethersproject/bignumber";
import EventContainer from "eventcontainer";
declare class ExtWallet extends EventContainer {
    private klaytn;
    private caver;
    constructor();
    get installed(): boolean;
    private checkConnected;
    loadAddress(): Promise<string | undefined>;
    loadChainId(): Promise<any>;
    loadBlockNumber(): Promise<any>;
    loadBalance(): Promise<BigNumber>;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
    createContract(address: string, abi: any): any;
}
declare const _default: ExtWallet;
export default _default;
//# sourceMappingURL=ExtWallet.d.ts.map