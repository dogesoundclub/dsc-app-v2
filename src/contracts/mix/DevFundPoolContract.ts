import Config from "../../Config";
import Contract from "../Contract";

class DevFundPoolContract extends Contract {

    constructor() {
        super(Config.contracts.DevFundPool, require("./KIP7StakingPoolContractABI.json"));
    }
}

export default new DevFundPoolContract();
