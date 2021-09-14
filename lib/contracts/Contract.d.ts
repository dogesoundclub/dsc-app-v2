import EventContainer from "eventcontainer";
export default abstract class Contract extends EventContainer {
    address: string;
    private abi;
    protected walletContract: any | undefined;
    protected contract: any;
    constructor(address: string, abi: any);
    protected findMethodABI(name: string): any;
    loadExtWalletContract(): Promise<any>;
    protected runMethod(methodName: string, ...params: any[]): Promise<any>;
    protected runWalletMethod(methodName: string, ...params: any[]): Promise<unknown>;
}
//# sourceMappingURL=Contract.d.ts.map