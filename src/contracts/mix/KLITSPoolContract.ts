import Config from "../../Config";
import KIP17DividendContract from "./KIP17DividendContract";

class KLITSPoolContract extends KIP17DividendContract {

    constructor() {
        super(Config.contracts.KLITSPool);
    }
}

export default new KLITSPoolContract();
