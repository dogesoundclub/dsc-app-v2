import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
import KIP7Contract from "../standard/KIP7Contract";
export default abstract class TurntableKIP7ListenersContractV2 extends Contract {
    constructor(address: string);
    abstract get lpToken(): KIP7Contract;
    totalShares(): Promise<BigNumber>;
    turntableShares(turntableId: BigNumberish): Promise<BigNumber>;
    shares(turntableId: BigNumberish, owner: string): Promise<BigNumber>;
    claimableOf(turntableId: BigNumberish, owner: string, token: string): Promise<BigNumber>;
    listen(turntableId: BigNumberish, amount: BigNumberish): Promise<void>;
    unlisten(turntableId: BigNumberish, amount: BigNumberish): Promise<void>;
    claim(turntableId: BigNumberish, token: string): Promise<void>;
}
//# sourceMappingURL=TurntableKIP7ListenersContractV2.d.ts.map