import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
import KIP7Contract from "../standard/KIP7Contract";
export default abstract class TurntableKIP7ListenersContract extends Contract {
    constructor(address: string);
    abstract get lpToken(): KIP7Contract;
    totalShares(): Promise<BigNumber>;
    shares(turntableId: BigNumberish, owner: string): Promise<BigNumber>;
    claimableOf(turntableId: BigNumberish, owner: string): Promise<BigNumber>;
    listen(turntableId: BigNumberish, amount: BigNumberish): Promise<void>;
    unlisten(turntableId: BigNumberish, amount: BigNumberish): Promise<void>;
    claim(turntableId: BigNumberish): Promise<void>;
}
//# sourceMappingURL=TurntableKIP7ListenersContract.d.ts.map