import { BigNumber } from "ethers";
import Config from "../../Config";
import Contract from "../Contract";

class TurntableExtrasContract extends Contract {

    constructor() {
        super(Config.contracts.TurntableExtras, require("./TurntableExtrasContractABI.json"));
    }
}

export default new TurntableExtrasContract();
