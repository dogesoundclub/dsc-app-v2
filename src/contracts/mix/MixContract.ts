import Config from "../../Config";
import Contract from "../Contract";

class MixContract extends Contract {

    constructor() {
        super(Config.contracts.Mix, require("./MixContractABI.json"));
    }
}

export default new MixContract();
