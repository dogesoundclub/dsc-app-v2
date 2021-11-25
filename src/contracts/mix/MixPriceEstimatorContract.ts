import { BigNumber } from "@ethersproject/bignumber";
import Config from "../../Config";
import Contract from "../Contract";

class MixPriceEstimatorContract extends Contract {

    constructor() {
        super(Config.contracts.MixPriceEstimator, require("./MixPriceEstimatorContractABI.json"));
    }

    public async estimatePos(amountIn: BigNumber): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("estimatePos", amountIn));
    }
}

export default new MixPriceEstimatorContract();
