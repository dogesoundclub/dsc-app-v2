import Config from "../../Config";
import KlayMIXLPTokenContract from "../mix/KlayMIXLPTokenContract";
import KIP7Contract from "../standard/KIP7Contract";
import TurntableKIP7ListenersContract from "./TurntableKIP7ListenersContract";

class KlayMIXListenersContract extends TurntableKIP7ListenersContract {

    constructor() {
        super(Config.contracts.KlayMIXListeners);
    }

    public get lpToken(): KIP7Contract {
        return KlayMIXLPTokenContract;
    }
}

export default new KlayMIXListenersContract();
