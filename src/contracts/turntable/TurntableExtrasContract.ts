import { BigNumberish } from "ethers";
import Config from "../../Config";
import Contract from "../Contract";

class TurntableExtrasContract extends Contract {

    constructor() {
        super(Config.contracts.TurntableExtras, require("./TurntableExtrasContractABI.json"));
    }

    public async extras(turntableId: BigNumberish): Promise<string> {
        return await this.runMethod("extras", turntableId);
    }

    public async set(turntableId: BigNumberish, extra: string) {
        await this.runWalletMethod("set", turntableId, extra);
    }
}

export default new TurntableExtrasContract();
