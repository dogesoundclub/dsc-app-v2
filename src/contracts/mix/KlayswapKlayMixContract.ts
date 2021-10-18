import { BigNumber } from "@ethersproject/bignumber";
import Contract from "../Contract";

class KlayswapKlayMixContract extends Contract {

    constructor() {
        super("0xa50cec0216c1cee6f90c7d5359444d46315279bd", require("./KlayswapKlayMixContractABI.json"));
    }

    public async getTokenA(): Promise<string> {
        return await this.runMethod("tokenA");
    }

    public async getTokenB(): Promise<string> {
        return await this.runMethod("tokenB");
    }

    public async getCurrentPool(): Promise<{
        a: BigNumber,
        b: BigNumber,
    }> {
        const results = await this.runMethod("getCurrentPool");
        return {
            a: BigNumber.from(results[0]),
            b: BigNumber.from(results[1]),
        };
    }
}

export default new KlayswapKlayMixContract();
