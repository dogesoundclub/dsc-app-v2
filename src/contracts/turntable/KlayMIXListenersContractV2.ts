import Config from "../../Config";
import KlayMIXLPTokenContract from "../mix/KlayMIXLPTokenContract";
import KIP7Contract from "../standard/KIP7Contract";
import TurntableKIP7ListenersContractV2 from "./TurntableKIP7ListenersContractV2";

class KlayMIXListenersContractV2 extends TurntableKIP7ListenersContractV2 {

    constructor() {
        super(Config.contracts.KlayMIXListenersV2);
    }

    public get lpToken(): KIP7Contract {
        return KlayMIXLPTokenContract;
    }
}

export default new KlayMIXListenersContractV2();
