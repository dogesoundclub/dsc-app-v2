import Config from "../../Config";
import KIP7Contract from "../standard/KIP7Contract";

class DevFundTokenContract extends KIP7Contract {

    constructor() {
        super(Config.contracts.DevFundToken, require("./DevFundTokenContractABI.json"));
    }
}

export default new DevFundTokenContract();
