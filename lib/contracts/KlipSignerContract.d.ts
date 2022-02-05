import Contract from "./Contract";
declare class KlipSignerContract extends Contract {
    constructor();
    signedKeys(key: string): Promise<string>;
    sign(key: string): Promise<void>;
}
declare const _default: KlipSignerContract;
export default _default;
//# sourceMappingURL=KlipSignerContract.d.ts.map