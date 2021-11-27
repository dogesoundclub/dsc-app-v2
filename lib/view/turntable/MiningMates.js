"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const MateItem_1 = __importDefault(require("../../component/turntable/MateItem"));
const MateContract_1 = __importDefault(require("../../contracts/nft/MateContract"));
const MatesListenersContract_1 = __importDefault(require("../../contracts/turntable/MatesListenersContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class MiningMates {
    constructor(params) {
        this.mates = [];
        this.totalMix = bignumber_1.BigNumber.from(0);
        const turntableId = parseInt(params.id, 10);
        Layout_1.default.current.title = "턴테이블의 메이트로부터 채굴";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mining-mates-from-turntable-view", (0, skynode_1.el)("h1", "턴테이블의 메이트로부터 채굴하기"), (0, skynode_1.el)("a.back-button", "< 뒤로가기", {
            click: () => ViewUtil_1.default.go(`/turntable/${turntableId}`),
        }), (0, skynode_1.el)("header", (0, skynode_1.el)(".total-mix", (0, skynode_1.el)("h4", "쌓인 총 MIX"), this.totalMixDisplay = (0, skynode_1.el)("span", "Loading...")), (0, skynode_1.el)("a.take-all-button", "한꺼번에 받기", {
            click: async () => {
                await MatesListenersContract_1.default.claim(turntableId, this.mates);
            },
        })), this.list = (0, skynode_1.el)(".mate-list", new Loading_1.default())));
        this.load(turntableId);
    }
    async load(turntableId) {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const result = await superagent_1.default.get("https://api.dogesound.club/mate/names");
            const mateNames = result.body;
            const mateBalance = (await MatesListenersContract_1.default.listenerCount(turntableId)).toNumber();
            const promises = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index) => {
                    const mateId = (await MatesListenersContract_1.default.listeners(turntableId, index)).toNumber();
                    if (await MateContract_1.default.ownerOf(mateId) === walletAddress) {
                        this.mates.push(mateId);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.list.empty();
            for (const mateId of this.mates) {
                new MateItem_1.default(this, turntableId, mateId, mateNames[mateId]).appendTo(this.list);
            }
        }
        else {
            this.list.empty();
        }
    }
    changeMix(mix) {
        this.totalMix = this.totalMix.add(mix);
        this.totalMixDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(this.totalMix), 5));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MiningMates;
//# sourceMappingURL=MiningMates.js.map