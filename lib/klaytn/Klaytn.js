"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Klaytn {
    constructor() {
        this.caver = new window.Caver(new window.Caver.providers.WebsocketProvider("ws://klaytn-node.klu.bs:9090"));
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