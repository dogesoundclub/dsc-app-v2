import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "../Contract";
export default class TurntableKIP7ListenersContract extends Contract {
    constructor(address: string);
    shares(turntableId: BigNumberish, owner: string): Promise<BigNumber>;
}
//# sourceMappingURL=TurntableKIP17ListenersContract.d.ts.map