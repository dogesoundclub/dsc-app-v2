"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Contract_1 = __importDefault(require("./Contract"));
class NameContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Name, require("./NameContractABI.json"));
    }
    async set(mateId, name) {
        const register = await Wallet_1.default.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.set(mateId, name).send({ from: register, gas: 1500000 });
    }
    async recordCount(mateId) {
        return ethers_1.BigNumber.from(await this.contract.methods.recordCount(mateId).call());
    }
    async record(mateId, index) {
        const result = await this.contract.methods.record(mateId, index).call();
        return {
            owner: result[0],
            name: result[1],
            blockNumber: result[2],
        };
    }
    async exists(name) {
        return await this.contract.methods.exists(name).call();
    }
    async getName(mateId) {
        return await this.contract.methods.getName(mateId).call();
    }
}
exports.default = new NameContract();
//# sourceMappingURL=NameContract.js.map