"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MateContract_1 = __importDefault(require("../../../contracts/nft/MateContract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const Loading_1 = __importDefault(require("../../loading/Loading"));
class MatesTab extends skynode_1.DomNode {
    constructor() {
        super(".mates-tab");
        this.append(this.loading = new Loading_1.default());
        this.load();
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const balance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            const mates = [];
            const promises = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index) => {
                    const mateId = await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index);
                    mates.push(mateId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            console.log(mates);
        }
        this.loading?.delete();
        this.loading = undefined;
    }
}
exports.default = MatesTab;
//# sourceMappingURL=MatesTab.js.map