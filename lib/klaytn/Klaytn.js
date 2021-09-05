"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
class Klaytn {
    constructor() {
        this.caver = window.caver !== undefined ? undefined :
            new window.Caver(new window.Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", {
                headers: [
                    { name: "Authorization", value: Config_1.default.authorization },
                    { name: "x-chain-id", value: String(Config_1.default.chainId) },
                ],
            }));
    }
    createContract(address, abi) {
        return this.caver === undefined ?
            new window.caver.klay.Contract(abi, address) :
            this.caver.contract.create(abi, address);
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map