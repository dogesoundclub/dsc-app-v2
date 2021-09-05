"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Contract_1 = __importDefault(require("./Contract"));
class MessageContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Message, require("./MessageContractABI.json"));
    }
    async set(mateId, message) {
        const register = await Wallet_1.default.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.set(mateId, message).send({ from: register, gas: 1500000 });
    }
    async recordCount(mateId) {
        return ethers_1.BigNumber.from(await this.contract.methods.recordCount(mateId).call());
    }
    async record(mateId, index) {
        const result = await this.contract.methods.record(mateId, index).call();
        return {
            owner: result[0],
            name: result[1],
            message: result[2],
            blockNumber: result[3],
        };
    }
    async remainBlocks(mateId) {
        return ethers_1.BigNumber.from(await this.contract.methods.remainBlocks(mateId).call());
    }
    async lastMessage(mateId) {
        return await this.contract.methods.lastMessage(mateId).call();
    }
}
exports.default = new MessageContract();
//# sourceMappingURL=MessageContract.js.map