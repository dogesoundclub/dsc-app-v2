"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const BurnPoolContract_1 = __importDefault(require("../../contracts/mix/BurnPoolContract"));
const MixEmitterContract_1 = __importDefault(require("../../contracts/mix/MixEmitterContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class BurnPool {
    constructor() {
        Layout_1.default.current.title = "소각 풀";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".burnpool-view", (0, skynode_1.el)("h1", "소각 풀"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "MIX 소각하기"), (0, skynode_1.el)(".balance", (0, skynode_1.el)("span", "쌓인 MIX: "), this.burnableDisplay = (0, skynode_1.el)("span", new Loading_1.default())), (0, skynode_1.el)("a", "소각하기", {
            click: async () => {
                await BurnPoolContract_1.default.burn();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }))));
        this.load();
        this.refreshInterval = setInterval(async () => {
            const pid = await BurnPoolContract_1.default.getPoolId();
            const burnable = await MixEmitterContract_1.default.pendingMix(pid);
            this.burnableDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(burnable)));
        }, 1000);
    }
    async load() {
        const pid = await BurnPoolContract_1.default.getPoolId();
        const burnable = await MixEmitterContract_1.default.pendingMix(pid);
        this.burnableDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(burnable)));
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.refreshInterval);
        this.container.delete();
    }
}
exports.default = BurnPool;
//# sourceMappingURL=BurnPool.js.map