"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventcontainer_1 = __importDefault(require("eventcontainer"));
class Wallet extends eventcontainer_1.default {
    constructor() {
        super();
        this.klaytn = window.klaytn;
        this.caver = window.caver;
        this.checkConnected();
    }
    async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }
    async loadAddress() {
        return this.caver === undefined ? undefined : (await this.caver.klay.getAccounts())[0];
    }
    async loadChainId() {
        return this.caver === undefined ? -1 : await this.caver.klay.getChainId();
    }
    async loadBlockNumber() {
        return this.caver === undefined ? -1 : await this.caver.klay.getBlockNumber();
    }
    async connected() {
        return await this.loadAddress() !== undefined;
    }
    async connect() {
        await this.klaytn?.enable();
        this.checkConnected();
    }
    createContract(address, abi) {
        return this.caver === undefined ? undefined : new this.caver.klay.Contract(abi, address);
    }
}
exports.default = new Wallet();
//# sourceMappingURL=Wallet%20copy.js.map