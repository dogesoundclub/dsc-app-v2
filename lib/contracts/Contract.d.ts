import EventContainer from "eventcontainer";
export default abstract class Contract extends EventContainer {
    address: string;
    private abi;
    protected walletContract: any | undefined;
    protected contract: any;
    constructor(address: string, abi: any);
    loadWalletContract(): Promise<any>;
}
//# sourceMappingURL=Contract.d.ts.map