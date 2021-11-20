import Config from "../../Config";
import KSPMIXLPTokenContract from "../mix/KSPMIXLPTokenContract";
import TurntableKIP7ListenersContract from "./TurntableKIP7ListenersContract";

class KSPMIXListenersContract extends TurntableKIP7ListenersContract {

    constructor() {
        super(Config.contracts.KSPMIXListeners);
    }

    public get lpToken() {
        return KSPMIXLPTokenContract;
    }
}

export default new KSPMIXListenersContract();
