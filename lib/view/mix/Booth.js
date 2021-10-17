"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const BoothContract_1 = __importDefault(require("../../contracts/mix/BoothContract"));
const MixContract_1 = __importDefault(require("../../contracts/mix/MixContract"));
const Klaytn_1 = __importDefault(require("../../klaytn/Klaytn"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Booth {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("BOOTH_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".booth-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("BOOTH_TITLE")), (0, skynode_1.el)("p", "MIX가 소각될 때 마다 소각량의 0.3%가 부스에 대한 지분에 따라 분배됩니다. MIX를 부스에 스테이킹하면 부스의 지분에 해당하는 MIXSET을 받게 됩니다. MIXSET은 지속적으로 복리 이자를 생성하며, 스테이킹 해제 시 원금 MIX와 수수료 이자를 함께 돌려받게 됩니다."), (0, skynode_1.el)("section", (0, skynode_1.el)(".price", (0, skynode_1.el)("span", "1 MIXSET = "), this.priceDisplay = (0, skynode_1.el)("span", new Loading_1.default()), (0, skynode_1.el)("span", " MIX")), (0, skynode_1.el)(".apr", (0, skynode_1.el)("span", "지난 24시간 동안의 APR: "), this.aprDisplay = (0, skynode_1.el)("span", new Loading_1.default()), (0, skynode_1.el)("span", "%")), (0, skynode_1.el)("p.warning", "* ARP은 지난 24시간의 기록을 365일로 늘려서 계산된 것입니다. 따라서 매일 변경될 수 있습니다.")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "MIX 스테이킹"), this.stakeInput = (0, skynode_1.el)("input"), (0, skynode_1.el)(".info", (0, skynode_1.el)(".balance", (0, skynode_1.el)("span", "MIX: "), this.balanceDisplay = (0, skynode_1.el)("span", new Loading_1.default())), (0, skynode_1.el)("a", "최대 수량 입력", {
            click: async () => {
                const walletAddress = await Wallet_1.default.loadAddress();
                if (walletAddress !== undefined) {
                    const balance = await MixContract_1.default.balanceOf(walletAddress);
                    this.stakeInput.domElement.value = ethers_1.utils.formatEther(balance);
                }
            },
        })), (0, skynode_1.el)("a", "예치하기", {
            click: async () => {
                await BoothContract_1.default.stake(ethers_1.utils.parseEther(this.stakeInput.domElement.value));
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("p.warning", "* 예치 시에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제 예치를 위한 것입니다.")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "스테이킹 해제"), this.unstakeInput = (0, skynode_1.el)("input"), (0, skynode_1.el)(".info", (0, skynode_1.el)(".balance", (0, skynode_1.el)("span", "MIXSET: "), this.mixsetDisplay = (0, skynode_1.el)("span", new Loading_1.default())), (0, skynode_1.el)("a", "최대 수량 입력", {
            click: async () => {
                const walletAddress = await Wallet_1.default.loadAddress();
                if (walletAddress !== undefined) {
                    const staked = await BoothContract_1.default.balanceOf(walletAddress);
                    this.unstakeInput.domElement.value = ethers_1.utils.formatEther(staked);
                }
            },
        })), (0, skynode_1.el)("a", "해제하기", {
            click: async () => {
                await BoothContract_1.default.unstake(ethers_1.utils.parseEther(this.unstakeInput.domElement.value));
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }))));
        this.loadInfo();
        this.loadBalance();
    }
    async loadInfo() {
        const totalMix = await MixContract_1.default.balanceOf(BoothContract_1.default.address);
        const totalMixset = await BoothContract_1.default.getTotalSupply();
        if (totalMixset.eq(0)) {
            this.priceDisplay.empty().appendText("1");
        }
        else {
            this.priceDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(totalMix.mul(ethers_1.BigNumber.from("1000000000000000000")).div(totalMixset))));
        }
        if (totalMix.eq(0)) {
            this.aprDisplay.empty().appendText("0");
        }
        else {
            const currentBlock = await Klaytn_1.default.loadBlockNumber();
            const transferEvents = await MixContract_1.default.getTransferEvents(BoothContract_1.default.address, currentBlock - 86400, currentBlock);
            let total24 = ethers_1.BigNumber.from(0);
            for (const event of transferEvents) {
                total24 = total24.add(event.returnValues[2]);
            }
            const stakeEvents = await BoothContract_1.default.getStakeEvents(currentBlock - 86400, currentBlock);
            for (const event of stakeEvents) {
                total24 = total24.sub(event.returnValues[1]);
            }
            const apr = total24.mul(36500).div(totalMix);
            this.aprDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(apr.toString()));
        }
    }
    async loadBalance() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const balance = await MixContract_1.default.balanceOf(walletAddress);
            this.balanceDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(balance)));
            const mixset = await BoothContract_1.default.balanceOf(walletAddress);
            this.mixsetDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(mixset)));
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Booth;
//# sourceMappingURL=Booth.js.map