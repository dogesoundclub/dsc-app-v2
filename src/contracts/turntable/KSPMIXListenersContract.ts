import Config from "../../Config";
import KSPMIXLPTokenContract from "../mix/KSPMIXLPTokenContract";
import KIP7Contract from "../standard/KIP7Contract";
import TurntableKIP7ListenersContract from "./TurntableKIP7ListenersContract";

class KSPMIXListenersContract extends TurntableKIP7ListenersContract {

    constructor() {
        super(Config.contracts.KSPMIXListeners);
    }

    public get lpToken(): KIP7Contract {
        return KSPMIXLPTokenContract;
    }
}

export default new KSPMIXListenersContract();
