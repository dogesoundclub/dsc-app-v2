"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Contract_1 = __importDefault(require("./Contract"));
class MateContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Mate, require("./MateContractABI.json"));
    }
    async ownerOf(mateId) {
        return await this.contract.methods.ownerOf(mateId).call();
    }
    async balanceOf(owner) {
        return ethers_1.BigNumber.from(await this.contract.methods.balanceOf(owner).call());
    }
    async tokenOfOwnerByIndex(owner, index) {
        return ethers_1.BigNumber.from(await this.contract.methods.tokenOfOwnerByIndex(owner, index).call());
    }
}
exports.default = new MateContract();
//# sourceMappingURL=MateContract.js.map