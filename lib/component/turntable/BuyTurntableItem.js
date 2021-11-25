"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Config_1 = __importDefault(require("../../Config"));
const MixEmitterContract_1 = __importDefault(require("../../contracts/mix/MixEmitterContract"));
const TurntablesContract_1 = __importDefault(require("../../contracts/turntable/TurntablesContract"));
const turntables_json_1 = __importDefault(require("../../turntables.json"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class BuyTurntableItem extends skynode_1.DomNode {
    constructor(typeId) {
        super(".buy-turntable-item");
        this.typeId = typeId;
        const turntable = turntables_json_1.default[typeId];
        this.append((0, skynode_1.el)("h4", turntable.name, { style: { color: turntable.color } }), (0, skynode_1.el)("img", { src: turntable.img }), (0, skynode_1.el)(".volume", `Volume: ${CommonUtil_1.default.numberWithCommas(String(turntable.volume))}`), (0, skynode_1.el)(".price", `Price: ${CommonUtil_1.default.numberWithCommas(String(turntable.price))} MIX`), (0, skynode_1.el)(".lifetime", `Lifetime: ${CommonUtil_1.default.numberWithCommas(String(turntable.lifetime))} Blocks`), this.apr = (0, skynode_1.el)(".apr", `APR: Loading...`), (0, skynode_1.el)("a", "구매하기", {
            click: async () => {
                await TurntablesContract_1.default.buy(typeId);
                setTimeout(() => ViewUtil_1.default.go("/turntable"), 2000);
            },
        }));
        this.loadAPR();
    }
    async loadAPR() {
        const blocksPerYear = 365 * 24 * 60 * 60;
        const turntable = turntables_json_1.default[this.typeId];
        const turntablePrice = ethers_1.utils.parseEther(String(turntable.price));
        const batteryPrice = ethers_1.utils.parseEther(String(turntable.price)).div(5);
        const annualBatteryCost = batteryPrice.mul(ethers_1.utils.parseEther((blocksPerYear / turntable.lifetime - 1).toFixed(18))).div(ethers_1.constants.WeiPerEther);
        const annualCost = turntablePrice.add(annualBatteryCost);
        const poolInfo = await MixEmitterContract_1.default.poolInfo(Config_1.default.isTestnet === true ? 3 : 8);
        const tokenPerBlock = poolInfo.allocPoint / 10000;
        const totalVolumne = await TurntablesContract_1.default.totalVolume();
        const totalRewardPerYear = ethers_1.utils.parseEther(String(tokenPerBlock * blocksPerYear)).sub((turntablePrice.mul(2).div(10)).add(annualBatteryCost));
        const apr = totalRewardPerYear.mul(10000).mul(turntable.volume).div(totalVolumne).div(annualCost).toNumber() / 100;
        this.apr.empty().appendText(`APR: ${apr}%`);
    }
}
exports.default = BuyTurntableItem;
//# sourceMappingURL=BuyTurntableItem.js.map