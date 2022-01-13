import Config from "../../Config";
import KSPMIXLPTokenContract from "../mix/KSPMIXLPTokenContract";
import KIP7Contract from "../standard/KIP7Contract";
import TurntableKIP7ListenersContractV2 from "./TurntableKIP7ListenersContractV2";

class KSPMIXListenersContractV2 extends TurntableKIP7ListenersContractV2 {

    constructor() {
        super(Config.contracts.KSPMIXListenersV2);
    }

    public get lpToken(): KIP7Contract {
        return KSPMIXLPTokenContract;
    }
}

export default new KSPMIXListenersContractV2();
