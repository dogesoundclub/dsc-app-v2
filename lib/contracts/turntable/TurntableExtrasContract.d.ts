import { BigNumberish } from "ethers";
import Contract from "../Contract";
declare class TurntableExtrasContract extends Contract {
    constructor();
    extras(turntableId: BigNumberish): Promise<string>;
    set(turntableId: BigNumberish, extra: string): Promise<void>;
}
declare const _default: TurntableExtrasContract;
export default _default;
//# sourceMappingURL=TurntableExtrasContract.d.ts.map