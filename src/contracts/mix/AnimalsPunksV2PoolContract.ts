import Config from "../../Config";
import KIP17DividendContract from "./KIP17DividendContract";

class AnimalsPunksV2PoolContract extends KIP17DividendContract {

    constructor() {
        super(Config.contracts.AnimalsPunksV2Pool);
    }
}

export default new AnimalsPunksV2PoolContract();
