"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Contract_1 = __importDefault(require("../Contract"));
class TurntableKIP7ListenersContractV2 extends Contract_1.default {
    constructor(address) {
        super(address, require("./TurntableKIP7ListenersContractV2ABI.json"));
    }
    async totalShares() {
        return bignumber_1.BigNumber.from(await this.runMethod("totalShares"));
    }
    async turntableShares(turntableId) {
        return bignumber_1.BigNumber.from(await this.runMethod("turntableShares", turntableId));
    }
    async shares(turntableId, owner) {
        return bignumber_1.BigNumber.from(await this.runMethod("shares", turntableId, owner));
    }
    async claimableOf(turntableId, owner, token) {
        return bignumber_1.BigNumber.from(await this.runMethod("claimableOf", turntableId, owner, token));
    }
    async listen(turntableId, amount) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const balance = await this.lpToken.balanceOf(owner);
            if (balance.lt(amount)) {
                if (confirm(`${String(parseInt(ethers_1.utils.formatEther(amount), 10))} LP 토큰이 필요합니다. LP 토큰을 생성하시겠습니까?`)) {
                    open(`https://klayswap.com/exchange/pool/detail/${this.lpToken.address}`);
                    await new Promise(() => { });
                }
            }
            else if ((await this.lpToken.allowance(owner, this.address)).lt(amount)) {
                await this.lpToken.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("listen", turntableId, amount);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("listen", turntableId, amount);
            }
        }
    }
    async unlisten(turntableId, amount) {
        await this.runWalletMethod("unlisten", turntableId, amount);
    }
    async claim(turntableId, token) {
        await this.runWalletMethod("claim", [turntableId], token);
    }
}
exports.default = TurntableKIP7ListenersContractV2;
//# sourceMappingURL=TurntableKIP7ListenersContractV2.js.map