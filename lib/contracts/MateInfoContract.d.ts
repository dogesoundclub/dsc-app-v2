import Contract from "./Contract";
interface SNS {
    twitter: string;
    instagram: string;
}
declare class MateInfoContract extends Contract {
    constructor();
    names(): Promise<string[]>;
    links(): Promise<SNS[]>;
}
declare const _default: MateInfoContract;
export default _default;
//# sourceMappingURL=MateInfoContract.d.ts.map