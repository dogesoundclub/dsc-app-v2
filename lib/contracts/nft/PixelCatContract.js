"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../../Config"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Contract_1 = __importDefault(require("../Contract"));
class PixelCatContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.PixelCat, require("./PixelCatContractABI.json"));
    }
    async ownerOf(mateId) {
        return await this.runMethod("ownerOf", mateId);
    }
    async balanceOf(owner) {
        return ethers_1.BigNumber.from(await this.runMethod("balanceOf", owner));
    }
    async tokenOfOwnerByIndex(owner, index) {
        return ethers_1.BigNumber.from(await this.runMethod("tokenOfOwnerByIndex", owner, index));
    }
    async transfer(to, mateId) {
        await this.runWalletMethod("transferFrom", await Wallet_1.default.loadAddress(), to, mateId);
    }
    async isApprovedForAll(owner, operator) {
        return await this.runMethod("isApprovedForAll", owner, operator);
    }
    async setApprovalForAll(operator, approved) {
        await this.runWalletMethod("setApprovalForAll", operator, approved);
    }
}
exports.default = new PixelCatContract();
//# sourceMappingURL=PixelCatContract.js.map