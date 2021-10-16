"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const DevFundPoolContract_1 = __importDefault(require("../../contracts/mix/DevFundPoolContract"));
const DevFundTokenContract_1 = __importDefault(require("../../contracts/mix/DevFundTokenContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class DevFund {
    constructor() {
        Layout_1.default.current.title = "개발 펀드";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".devfund-view", (0, skynode_1.el)("h1", "개발 펀드"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "Mix 수령하기"), (0, skynode_1.el)(".balance", (0, skynode_1.el)("span", "쌓인 Mix: "), this.claimableDisplay = (0, skynode_1.el)("span", new Loading_1.default())), (0, skynode_1.el)("a", "수령하기", {
            click: async () => {
                await DevFundPoolContract_1.default.claim();
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        })), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "Dev Fund Token 예치하기"), this.stakeInput = (0, skynode_1.el)("input"), (0, skynode_1.el)(".info", (0, skynode_1.el)(".balance", (0, skynode_1.el)("span", "Dev Fund Token: "), this.balanceDisplay = (0, skynode_1.el)("span", new Loading_1.default())), (0, skynode_1.el)("a", "최대 수량 입력", {
            click: async () => {
                const walletAddress = await Wallet_1.default.loadAddress();
                if (walletAddress !== undefined) {
                    const balance = await DevFundTokenContract_1.default.balanceOf(walletAddress);
                    this.stakeInput.domElement.value = ethers_1.utils.formatEther(balance);
                }
            },
        })), (0, skynode_1.el)("a", "예치하기", {
            click: async () => {
                await DevFundPoolContract_1.default.stake(ethers_1.utils.parseEther(this.stakeInput.domElement.value));
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("p.warning", "* 예치 시에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제 예치를 위한 것입니다.")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "Dev Fund Token 출금하기"), this.unstakeInput = (0, skynode_1.el)("input"), (0, skynode_1.el)(".info", (0, skynode_1.el)(".balance", (0, skynode_1.el)("span", "Staked: "), this.stakedDisplay = (0, skynode_1.el)("span", new Loading_1.default())), (0, skynode_1.el)("a", "최대 수량 입력", {
            click: async () => {
                const walletAddress = await Wallet_1.default.loadAddress();
                if (walletAddress !== undefined) {
                    const staked = await DevFundPoolContract_1.default.shares(walletAddress);
                    this.unstakeInput.domElement.value = ethers_1.utils.formatEther(staked);
                }
            },
        })), (0, skynode_1.el)("a", "출금하기", {
            click: async () => {
                await DevFundPoolContract_1.default.unstake(ethers_1.utils.parseEther(this.unstakeInput.domElement.value));
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }))));
        this.load();
        this.refreshInterval = setInterval(async () => {
            const walletAddress = await Wallet_1.default.loadAddress();
            if (walletAddress !== undefined) {
                const claimable = await DevFundPoolContract_1.default.claimableOf(walletAddress);
                this.claimableDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(claimable)));
            }
        }, 1000);
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const claimable = await DevFundPoolContract_1.default.claimableOf(walletAddress);
            this.claimableDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(claimable)));
            const balance = await DevFundTokenContract_1.default.balanceOf(walletAddress);
            this.balanceDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(balance)));
            const staked = await DevFundPoolContract_1.default.shares(walletAddress);
            this.stakedDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(staked)));
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.refreshInterval);
        this.container.delete();
    }
}
exports.default = DevFund;
//# sourceMappingURL=DevFund.js.map