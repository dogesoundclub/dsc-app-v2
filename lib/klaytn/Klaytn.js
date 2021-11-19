"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Klaytn {
    createContract(address, abi) {
        return new window.caver.klay.Contract(abi, address);
    }
    async loadBlockNumber() {
        return await window.caver.klay.getBlockNumber();
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map