import { BigNumber } from "ethers";
import Config from "../../Config";
import Contract from "../Contract";
import MixPriceEstimatorContract from "./MixPriceEstimatorContract";

class KlayswapContract extends Contract {

    constructor() {
        super(Config.contracts.Klayswap, require("./KlayswapContractABI.json"));
    }

    public async buyMix(amount: BigNumber) {
        const klay = await MixPriceEstimatorContract.estimatePos(amount);
        await this.runWalletMethodWithValue(klay, "exchangeKlayPos", "0xDd483a970a7A7FeF2B223C3510fAc852799a88BF", amount.mul(99).div(100), []);
    }
}

export default new KlayswapContract();
