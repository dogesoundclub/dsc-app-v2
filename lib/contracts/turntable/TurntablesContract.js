"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../../Config"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Contract_1 = __importDefault(require("../Contract"));
const MixContract_1 = __importDefault(require("../mix/MixContract"));
class TurntablesContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Turntables, require("./TurntablesContractABI.json"));
    }
    async types(typeId) {
        const result = await this.runMethod("types", typeId);
        return {
            price: bignumber_1.BigNumber.from(result[0]),
            destroyReturn: bignumber_1.BigNumber.from(result[1]),
            volume: parseInt(result[2], 10),
            lifetime: parseInt(result[3], 10),
        };
    }
    async buy(typeId) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const price = (await this.types(typeId)).price;
            const balance = await MixContract_1.default.balanceOf(owner);
            if (balance.lt(price)) {
                if (confirm(`${String(parseInt(ethers_1.utils.formatEther(price), 10))} 믹스가 필요합니다. 믹스를 구매하시겠습니까?`)) {
                    open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                    await new Promise(() => { });
                }
            }
            else if ((await MixContract_1.default.allowance(owner, this.address)).lt(price)) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", typeId);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("buy", typeId);
            }
        }
    }
    async turntables(turntableId) {
        const result = await this.runMethod("turntables", turntableId);
        return {
            owner: result[0],
            typeId: parseInt(result[1], 10),
            endBlock: parseInt(result[2], 10),
            lastClaimedBlock: parseInt(result[3], 10),
        };
    }
    async totalVolume() {
        return bignumber_1.BigNumber.from(await this.runMethod("totalVolume"));
    }
    async turntableLength() {
        return bignumber_1.BigNumber.from(await this.runMethod("turntableLength"));
    }
    async claimableOf(turntableId) {
        return bignumber_1.BigNumber.from(await this.runMethod("claimableOf", turntableId));
    }
    async charge(turntableId, amount) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const balance = await MixContract_1.default.balanceOf(owner);
            if (balance.lt(amount)) {
                if (confirm(`${String(parseInt(ethers_1.utils.formatEther(amount), 10))} 믹스가 필요합니다. 믹스를 구매하시겠습니까?`)) {
                    open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                    await new Promise(() => { });
                }
            }
            else if ((await MixContract_1.default.allowance(owner, this.address)).lt(amount)) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("charge", turntableId, amount);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("charge", turntableId, amount);
            }
        }
    }
    async claim(turntableIds) {
        await this.runWalletMethod("claim", turntableIds);
    }
    async destroy(turntableId) {
        await this.runWalletMethod("destroy", turntableId);
    }
}
exports.default = new TurntablesContract();
//# sourceMappingURL=TurntablesContract.js.map