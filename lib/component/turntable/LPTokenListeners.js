"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const MixContract_1 = __importDefault(require("../../contracts/mix/MixContract"));
const MixEmitterContract_1 = __importDefault(require("../../contracts/mix/MixEmitterContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Prompt_1 = __importDefault(require("../../ui/dialogue/Prompt"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class LPTokenListeners extends skynode_1.DomNode {
    constructor(name, contract, turntableId, poolId) {
        super(".lp-token-listeners");
        this.contract = contract;
        this.turntableId = turntableId;
        this.poolId = poolId;
        this.append((0, skynode_1.el)("h4", name));
        this.load();
    }
    async load() {
        const poolInfo = await MixEmitterContract_1.default.poolInfo(this.poolId);
        const tokenPerBlock = poolInfo.allocPoint / 10000;
        const blocksPerYear = 365 * 24 * 60 * 60;
        const result = await superagent_1.default.get("https://api.dogesound.club/mix/price");
        const mixPrice = ethers_1.utils.parseEther(result.text);
        const totalShares = await this.contract.totalShares();
        const totalMixInLP = await MixContract_1.default.balanceOf(this.contract.lpToken.address);
        const lpTotalSupply = await this.contract.lpToken.getTotalSupply();
        const stakingTokenPrice = totalMixInLP.mul(mixPrice).div(lpTotalSupply);
        const totalRewardPricePerYear = mixPrice.mul(Math.round(tokenPerBlock * blocksPerYear));
        const totalStakingTokenInPool = totalShares.mul(stakingTokenPrice);
        const apr = totalStakingTokenInPool.eq(0) === true ? 0 : totalRewardPricePerYear.mul(10000).div(totalStakingTokenInPool).toNumber() / 100;
        this.append((0, skynode_1.el)(".apr"), (0, skynode_1.el)(".total-lp", `총 LP: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(totalShares))}`));
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const share = await this.contract.shares(this.turntableId, walletAddress);
            const lpBalance = await this.contract.lpToken.balanceOf(walletAddress);
            this.append((0, skynode_1.el)(".staking-lp", `내가 넣은 LP: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(share))}`), (0, skynode_1.el)(".my-lp", `내가 가진 LP: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(lpBalance))}`), (0, skynode_1.el)("a", "LP 토큰 리스너 등록", {
                click: () => {
                    new Prompt_1.default("얼마만큼의 LP 토큰을 등록하시겠습니까?", "등록하기", async (amount) => {
                        const lp = ethers_1.utils.parseEther(amount);
                        await this.contract.listen(this.turntableId, lp);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    });
                },
            }), (0, skynode_1.el)("a", "LP 토큰 리스너 등록 취소", {
                click: () => {
                    new Prompt_1.default("얼마만큼의 LP 토큰을 등록 취소하시겠습니까?", "등록 취소", async (amount) => {
                        const lp = ethers_1.utils.parseEther(amount);
                        await this.contract.unlisten(this.turntableId, lp);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    });
                },
            }));
        }
    }
}
exports.default = LPTokenListeners;
//# sourceMappingURL=LPTokenListeners.js.map