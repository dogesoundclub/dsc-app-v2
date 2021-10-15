import Config from "../../Config";
import Contract from "../Contract";

class MixEmitterContract extends Contract {

    constructor() {
        super(Config.contracts.MixEmitter, require("./MixEmitterContractABI.json"));
    }
}

export default new MixEmitterContract();
