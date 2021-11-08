import Config from "../../Config";
import Contract from "../Contract";

class TurntablesContract extends Contract {

    constructor() {
        super(Config.contracts.Turntables, require("./TurntablesContractABI.json"));
    }
}

export default new TurntablesContract();
