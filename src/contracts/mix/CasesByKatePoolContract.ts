import Config from "../../Config";
import KIP17DividendContract from "./KIP17DividendContract";

class CasesByKatePoolContract extends KIP17DividendContract {

    constructor() {
        super(Config.contracts.CasesByKatePool);
    }
}

export default new CasesByKatePoolContract();
