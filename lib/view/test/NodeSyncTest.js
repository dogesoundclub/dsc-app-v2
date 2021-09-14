"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ExtWallet_1 = __importDefault(require("../../klaytn/ExtWallet"));
class NodeSyncTest {
    constructor() {
        skynode_1.BodyNode.append(this.container = (0, skynode_1.el)(".node-sync-test-view", "TEST!"));
        const caver = new window.Caver(new window.Caver.providers.WebsocketProvider("wss://klaytn-node.dogesound.club:9091"));
        setInterval(async () => {
            const block = await caver.klay.getBlockNumber();
            console.log(block, block - await ExtWallet_1.default.loadBlockNumber());
        }, 1000);
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = NodeSyncTest;
//# sourceMappingURL=NodeSyncTest.js.map