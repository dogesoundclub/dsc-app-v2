import Config from "../../Config";
import KIP17DividendContract from "./KIP17DividendContract";

class PixelCatPoolContract extends KIP17DividendContract {

    constructor() {
        super(Config.contracts.PixelCatPool);
    }
}

export default new PixelCatPoolContract();
