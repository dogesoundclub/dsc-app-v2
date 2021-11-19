import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../../Config";
import Contract from "../Contract";

class KSPMIXListenersContract extends Contract {

    constructor() {
        super(Config.contracts.KSPMIXListeners, require("./TurntableKIP7ListenersContractABI.json"));
    }

    public async shares(turntableId: BigNumberish, owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("shares", turntableId, owner));
    }
}

export default new KSPMIXListenersContract();
