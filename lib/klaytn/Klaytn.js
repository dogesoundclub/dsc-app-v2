"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Klaytn {
    constructor() {
        this.caver = new window.Caver(new window.Caver.providers.WebsocketProvider("wss://klaytn04.fandom.finance/ws/", {
            reconnect: {
                auto: true,
                delay: 1000,
                maxAttempts: true,
                onTimeout: false
            },
        }));
    }
    createContract(address, abi) {
        return this.caver.contract.create(abi, address);
    }
    async loadBlockNumber() {
        return await this.caver.klay.getBlockNumber();
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map