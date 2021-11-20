import Config from "../../Config";
import KIP7Contract from "../standard/KIP7Contract";

class KlayMIXLPTokenContract extends KIP7Contract {

    constructor() {
        super(Config.contracts.KlayMIXLPToken, require("./MixContractABI.json"));
    }
}

export default new KlayMIXLPTokenContract();
