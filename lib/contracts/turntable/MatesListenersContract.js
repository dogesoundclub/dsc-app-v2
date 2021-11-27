"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const Config_1 = __importDefault(require("../../Config"));
const Contract_1 = __importDefault(require("../Contract"));
class MatesListenersContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MatesListeners, require("./TurntableKIP17ListenersContractABI.json"));
    }
    async listening(mateId) {
        return await this.runMethod("listening", mateId);
    }
    async listeningTo(mateId) {
        return bignumber_1.BigNumber.from(await this.runMethod("listeningTo", mateId));
    }
    async listeners(turntableId, index) {
        return bignumber_1.BigNumber.from(await this.runMethod("listeners", turntableId, index));
    }
    async listenerCount(turntableId) {
        return bignumber_1.BigNumber.from(await this.runMethod("listenerCount", turntableId));
    }
    async totalShares() {
        return bignumber_1.BigNumber.from(await this.runMethod("totalShares"));
    }
    async claimableOf(turntableId, mateId) {
        return bignumber_1.BigNumber.from(await this.runMethod("claimableOf", turntableId, mateId));
    }
    async listen(turntableId, mateIds) {
        await this.runWalletMethodWithLargeGas("listen", turntableId, mateIds);
    }
    async unlisten(turntableId, mateIds) {
        await this.runWalletMethodWithLargeGas("unlisten", turntableId, mateIds);
    }
    async claim(turntableId, mateIds) {
        if (mateIds.length <= 25) {
            await this.runWalletMethod("claim", turntableId, mateIds);
        }
        else {
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
exports.default = new MatesListenersContract();
//# sourceMappingURL=MatesListenersContract.js.map