"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const MixEmitterContract_1 = __importDefault(require("../../contracts/mix/MixEmitterContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Prompt_1 = __importDefault(require("../../ui/dialogue/Prompt"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class LPTokenListeners extends skynode_1.DomNode {
    constructor(name, contract, turntableId, poolId, lpPoolId) {
        super(".lp-token-listeners");
        this.contract = contract;
        this.turntableId = turntableId;
        this.poolId = poolId;
        this.lpPoolId = lpPoolId;
        this.append((0, skynode_1.el)("h4", name));
        this.load();
    }
    async load() {
        const poolInfo = await MixEmitterContract_1.default.poolInfo(this.poolId);
        const tokenPerBlock = poolInfo.allocPoint / 10000 / 2 * 0.7;
        const lpPoolInfo = await MixEmitterContract_1.default.poolInfo(this.lpPoolId);
        const lpTotalSupply = await this.contract.lpToken.getTotalSupply();
        const totalShares = await this.contract.totalShares();
        const tokenPerBlockToLP = lpPoolInfo.allocPoint / 10000 / 2 * 0.7 * totalShares.mul(1000000).div(lpTotalSupply).toNumber() / 1000000;
        const blocksPerYear = 365 * 24 * 60 * 60;
        try {
            this.append((0, skynode_1.el)(".total-lp", `총 LP: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(totalShares))}`), (0, skynode_1.el)(".apr", `APR: 0%`));
        }
        catch (e) {
            console.error(e);
            this.append((0, skynode_1.el)(".total-lp", `총 LP: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(totalShares))}`), (0, skynode_1.el)(".apr", "APR: 가격 정보를 불러오는데 실패했습니다."));
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const share = await this.contract.shares(this.turntableId, walletAddress);
            const lpBalance = await this.contract.lpToken.balanceOf(walletAddress);
            const reward = await this.contract.claimableOf(this.turntableId, walletAddress);
            this.append((0, skynode_1.el)(".staking-lp", `내가 넣은 LP: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(share))}`), (0, skynode_1.el)(".my-lp", `내가 가진 LP: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(lpBalance))}`), (0, skynode_1.el)(".amount", `쌓인 MIX: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(reward))}`), (0, skynode_1.el)("a", "LP 토큰 리스너 등록", {
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
            }), (0, skynode_1.el)("a", "MIX 받기 허락", {
                click: async () => {
                    await this.contract.unlisten(this.turntableId, 0);
                },
            }), (0, skynode_1.el)("a", "MIX 받기", {
                click: async () => {
                    await this.contract.claim(this.turntableId);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                },
            }), (0, skynode_1.el)("p.warning", "* MIX 받기 허락을 먼저 수행하신 후, MIX 받기를 실행해주세요."));
        }
    }
}
exports.default = LPTokenListeners;
//# sourceMappingURL=LPTokenListeners.js.map