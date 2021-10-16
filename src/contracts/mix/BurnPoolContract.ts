import { BigNumber } from "@ethersproject/bignumber";
import Config from "../../Config";
import Contract from "../Contract";

class BurnPoolContract extends Contract {

    constructor() {
        super(Config.contracts.BurnPool, require("./BurnPoolContractABI.json"));
    }

    public async getPoolId(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("pid"));
    }

    public async burn() {
        await this.runWalletMethod("burn");
    }
}

export default new BurnPoolContract();
