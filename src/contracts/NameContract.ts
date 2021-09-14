import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Contract from "./Contract";

export interface NameRecord {
    owner: string,
    name: string,
    blockNumber: BigNumber,
}

class NameContract extends Contract {

    constructor() {
        super(Config.contracts.Name, require("./NameContractABI.json"));
    }

    public async set(mateId: BigNumberish, name: string): Promise<void> {
        await this.runWalletMethod("set", mateId, name);
    }

    public async recordCount(mateId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("recordCount", mateId));
    }

    public async record(mateId: BigNumberish, index: BigNumberish): Promise<NameRecord> {
        const result = await this.runMethod("record", mateId, index);
        return {
            owner: result[0],
            name: result[1],
            blockNumber: result[2],
        };
    }

    public async exists(name: string): Promise<boolean> {
        return await this.runMethod("exists", name);
    }

    public async getName(mateId: BigNumberish): Promise<string> {
        return await this.runMethod("getName", mateId);
    }
}

export default new NameContract();
