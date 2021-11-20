import Config from "../../Config";
import KIP7Contract from "../standard/KIP7Contract";

class KSPMIXLPTokenContract extends KIP7Contract {

    constructor() {
        super(Config.contracts.KSPMIXLPToken, require("./MixContractABI.json"));
    }
}

export default new KSPMIXLPTokenContract();
