import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../../Config";
import Contract from "../Contract";

class MatesListenersContract extends Contract {

    constructor() {
        super(Config.contracts.MatesListeners, require("./TurntableKIP17ListenersContractABI.json"));
    }

    public async listening(mateId: BigNumberish): Promise<boolean> {
        return await this.runMethod("listening", mateId);
    }

    public async listeningTo(mateId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("listeningTo", mateId));
    }
}

export default new MatesListenersContract();
