"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const TurntableItem_1 = __importDefault(require("../component/turntable/TurntableItem"));
const MateContract_1 = __importDefault(require("../contracts/nft/MateContract"));
const KlayMIXListenersContractV2_1 = __importDefault(require("../contracts/turntable/KlayMIXListenersContractV2"));
const KSPMIXListenersContractV2_1 = __importDefault(require("../contracts/turntable/KSPMIXListenersContractV2"));
const MatesListenersContract_1 = __importDefault(require("../contracts/turntable/MatesListenersContract"));
const TurntablesContract_1 = __importDefault(require("../contracts/turntable/TurntablesContract"));
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class Turntable {
    constructor() {
        Layout_1.default.current.title = "턴테이블";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".turntable-view", (0, skynode_1.el)("h1", "턴테이블"), (0, skynode_1.el)("p", "턴테이블은 MIX를 중~장기로 스테이킹하고자 하는 사용자들을 위한 시스템입니다. 턴테이블의 볼륨에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "나의 턴테이블"), this.myTurntableList = (0, skynode_1.el)(".turntable-list")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "리스닝중인 턴테이블"), this.listeningTurntableList = (0, skynode_1.el)(".turntable-list")), (0, skynode_1.el)("section", (0, skynode_1.el)("header", (0, skynode_1.el)("h2", "전체 턴테이블"), this.totalVolumeDisplay = (0, skynode_1.el)(".total-volume")), this.totalTurntableList = (0, skynode_1.el)(".turntable-list"))));
        this.loadTotalVolume();
        this.loadTurntables();
    }
    async loadTotalVolume() {
        const totalVolume = await TurntablesContract_1.default.totalVolume();
        this.totalVolumeDisplay.empty().appendText(`총 볼륨: ${CommonUtil_1.default.numberWithCommas(totalVolume.toString())}`);
    }
    async loadTurntables() {
        const count = (await TurntablesContract_1.default.turntableLength()).toNumber();
        const walletAddress = await Wallet_1.default.loadAddress();
        const currentBlock = await Klaytn_1.default.loadBlockNumber();
        const matesTurntableIds = [];
        if (walletAddress !== undefined) {
            const balance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            const promises = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index) => {
                    const mateId = await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index);
                    if (await MatesListenersContract_1.default.listening(mateId)) {
                        matesTurntableIds.push((await MatesListenersContract_1.default.listeningTo(mateId)).toNumber());
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
        }
        const promises = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (id) => {
                try {
                    const turntable = await TurntablesContract_1.default.turntables(id);
                    if (this.container.deleted !== true) {
                        if (matesTurntableIds.includes(id) === true || (walletAddress !== undefined && ((await KlayMIXListenersContractV2_1.default.shares(id, walletAddress)).gt(0) ||
                            (await KSPMIXListenersContractV2_1.default.shares(id, walletAddress)).gt(0)))) {
                            new TurntableItem_1.default(id, currentBlock, turntable).appendTo(this.listeningTurntableList);
                        }
                        if (turntable.owner !== ethers_1.constants.AddressZero) {
                            if (turntable.owner === walletAddress) {
                                new TurntableItem_1.default(id, currentBlock, turntable, true).appendTo(this.myTurntableList);
                            }
                            new TurntableItem_1.default(id, currentBlock, turntable).appendTo(this.totalTurntableList);
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Turntable;
//# sourceMappingURL=Turntable.js.map