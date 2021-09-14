import { BigNumberish } from "@ethersproject/bignumber";
import EventContainer from "eventcontainer";
declare class Klip extends EventContainer {
    address: undefined | string;
    private request;
    get connected(): boolean;
    connect(): Promise<void>;
    runContractMethod(address: string, abi: any, params: any, value?: BigNumberish): Promise<void>;
}
declare const _default: Klip;
export default _default;
//# sourceMappingURL=Klip.d.ts.map