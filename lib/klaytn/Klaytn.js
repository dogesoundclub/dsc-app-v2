"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Klaytn {
    constructor() {
        this.caver = window.caver !== undefined ? undefined :
            new window.Caver("https://api.dogesound.club:9013/");
    }
    createContract(address, abi) {
        return this.caver === undefined ?
            new window.caver.klay.Contract(abi, address) :
            this.caver.contract.create(abi, address);
    }
    async loadBlockNumber() {
        return this.caver === undefined ?
            await window.caver.klay.getBlockNumber() :
            await this.caver.klay.getBlockNumber();
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map