"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Klaytn {
    constructor() {
        this.caver = new window.Caver(new window.Caver.providers.WebsocketProvider("wss://klaytn-node.dogesound.club:9090"));
    }
    createContract(address, abi) {
        return this.caver === undefined ?
            new window.caver.klay.Contract(abi, address) :
            this.caver.contract.create(abi, address);
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map