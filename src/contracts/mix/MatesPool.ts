import Config from "../../Config";
import Contract from "../Contract";

class MatesPoolContract extends Contract {

    constructor() {
        super(Config.contracts.MatesPool, require("./MatesPoolContractABI.json"));
    }
}

export default new MatesPoolContract();
