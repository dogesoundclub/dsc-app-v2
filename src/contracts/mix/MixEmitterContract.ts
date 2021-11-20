import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../../Config";
import Contract from "../Contract";

export interface PoolInfo {
    to: string,
    allocPoint: number,
    lastEmitBlock: number,
}

class MixEmitterContract extends Contract {

    constructor() {
        super(Config.contracts.MixEmitter, require("./MixEmitterContractABI.json"));
    }

    public async poolCount(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("poolCount"));
    }

    public async pendingMix(pid: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("pendingMix", pid));
    }

    public async poolInfo(pid: BigNumberish): Promise<PoolInfo> {
        const result = await this.runMethod("poolInfo", pid);
        return {
            to: result[0],
            allocPoint: parseInt(result[1], 10),
            lastEmitBlock: parseInt(result[2], 10),
        };
    }
}

export default new MixEmitterContract();
