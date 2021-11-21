import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
interface TurntableType {
    price: BigNumber;
    destroyReturn: BigNumber;
    volume: number;
    lifetime: number;
}
export interface TurntableInfo {
    owner: string;
    typeId: number;
    endBlock: number;
    lastClaimedBlock: number;
}
declare class TurntablesContract extends Contract {
    constructor();
    types(typeId: BigNumberish): Promise<TurntableType>;
    buy(typeId: BigNumberish): Promise<void>;
    turntables(turntableId: BigNumberish): Promise<TurntableInfo>;
    totalVolume(): Promise<BigNumber>;
    turntableLength(): Promise<BigNumber>;
    claimableOf(turntableId: BigNumberish): Promise<BigNumber>;
    charge(turntableId: BigNumberish, amount: BigNumber): Promise<void>;
    claim(turntableIds: BigNumberish[]): Promise<void>;
    destroy(turntableId: BigNumberish): Promise<void>;
}
declare const _default: TurntablesContract;
export default _default;
//# sourceMappingURL=TurntablesContract.d.ts.map