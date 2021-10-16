import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../../Config";
import Contract from "../Contract";

export interface PoolInfo {
    to: string,
    allocPoint: BigNumber,
    lastEmitBlock: BigNumber,
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
            allocPoint: BigNumber.from(result[1]),
            lastEmitBlock: BigNumber.from(result[2]),
        };
    }
}

export default new MixEmitterContract();
