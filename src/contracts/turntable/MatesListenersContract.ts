import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../../Config";
import Contract from "../Contract";

class MatesListenersContract extends Contract {

    constructor() {
        super(Config.contracts.MatesListeners, require("./TurntableKIP17ListenersContractABI.json"));
    }

    public async listening(mateId: BigNumberish): Promise<boolean> {
        return await this.runMethod("listening", mateId);
    }

    public async listeningTo(mateId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("listeningTo", mateId));
    }

    public async listeners(turntableId: BigNumberish, index: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("listeners", turntableId, index));
    }

    public async listenerCount(turntableId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("listenerCount", turntableId));
    }

    public async totalShares(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("totalShares"));
    }

    public async claimableOf(turntableId: BigNumberish, mateId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("claimableOf", turntableId, mateId));
    }

    public async listen(
        turntableId: BigNumberish,
        mateIds: BigNumberish[],
    ): Promise<void> {
        await this.runWalletMethodWithLargeGas("listen",
            turntableId, mateIds,
        );
    }

    public async unlisten(
        turntableId: BigNumberish,
        mateIds: BigNumberish[],
    ): Promise<void> {
        await this.runWalletMethodWithLargeGas("unlisten",
            turntableId, mateIds,
        );
    }

    public async claim(
        turntableId: BigNumberish,
        mateIds: BigNumberish[],
    ): Promise<void> {
        if (mateIds.length <= 25) {
            await this.runWalletMethod("claim", turntableId, mateIds);
        } else {
            for (let i = 0; i < mateIds.length; i += 100) {
                let limit = i + 100;
                if (limit > mateIds.length) {
                    limit = mateIds.length;
                }
                await this.runWalletMethodWithLargeGas("claim", turntableId, mateIds.slice(i, limit));
            }
        }
    }
}

export default new MatesListenersContract();
