import Config from "../../Config";
import KlayMIXLPTokenContract from "../mix/KlayMIXLPTokenContract";
import TurntableKIP7ListenersContract from "./TurntableKIP7ListenersContract";

class KlayMIXListenersContract extends TurntableKIP7ListenersContract {

    constructor() {
        super(Config.contracts.KlayMIXListeners);
    }

    public get lpToken() {
        return KlayMIXLPTokenContract;
    }
}

export default new KlayMIXListenersContract();
