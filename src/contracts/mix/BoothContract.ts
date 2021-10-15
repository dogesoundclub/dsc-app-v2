import Config from "../../Config";
import Contract from "../Contract";

class BoothContract extends Contract {

    constructor() {
        super(Config.contracts.Booth, require("./BoothContractABI.json"));
    }
}

export default new BoothContract();
