import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import MixContract from "../../contracts/mix/MixContract";
import MixEmitterContract from "../../contracts/mix/MixEmitterContract";
import TurntableKIP7ListenersContract from "../../contracts/turntable/TurntableKIP7ListenersContract";
import Wallet from "../../klaytn/Wallet";
import Prompt from "../../ui/dialogue/Prompt";
import ViewUtil from "../../view/ViewUtil";

export default class LPTokenListeners extends DomNode {

    constructor(
        name: string,
        private contract: TurntableKIP7ListenersContract,
        private turntableId: number,
        private poolId: number,
        private lpPoolId: number,
    ) {
        super(".lp-token-listeners");
        this.append(
            el("h4", name),
        );
        this.load();
    }

    private async load() {

        const poolInfo = await MixEmitterContract.poolInfo(this.poolId);
        const tokenPerBlock = poolInfo.allocPoint / 10000 / 2 * 0.7;

        const lpPoolInfo = await MixEmitterContract.poolInfo(this.lpPoolId);
        const lpTotalSupply = await this.contract.lpToken.getTotalSupply();
        const totalShares = await this.contract.totalShares();
        const tokenPerBlockToLP = lpPoolInfo.allocPoint / 10000 / 2 * 0.7 * totalShares.mul(1000000).div(lpTotalSupply).toNumber() / 1000000;

        const blocksPerYear = 365 * 24 * 60 * 60;

        try {
            this.append(
                el(".total-lp", `총 LP: ${CommonUtil.numberWithCommas(utils.formatEther(totalShares))}`),
                el(".apr", `APR: 0%`),
            );
        } catch (e) {
            console.error(e);
            this.append(
                el(".total-lp", `총 LP: ${CommonUtil.numberWithCommas(utils.formatEther(totalShares))}`),
                el(".apr", "APR: 가격 정보를 불러오는데 실패했습니다."),
            );
        }

        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const share = await this.contract.shares(this.turntableId, walletAddress);
            const lpBalance = await this.contract.lpToken.balanceOf(walletAddress);
            const reward = await this.contract.claimableOf(this.turntableId, walletAddress);
            this.append(
                el(".staking-lp", `내가 넣은 LP: ${CommonUtil.numberWithCommas(utils.formatEther(share))}`),
                el(".my-lp", `내가 가진 LP: ${CommonUtil.numberWithCommas(utils.formatEther(lpBalance))}`),
                el(".amount", `쌓인 MIX: ${CommonUtil.numberWithCommas(utils.formatEther(reward))}`),
                el("a", "LP 토큰 리스너 등록", {
                    click: () => {
                        new Prompt("얼마만큼의 LP 토큰을 등록하시겠습니까?", "등록하기", async (amount) => {
                            const lp = utils.parseEther(amount);
                            await this.contract.listen(this.turntableId, lp);
                            ViewUtil.waitTransactionAndRefresh();
                        });
                    },
                }),
                el("a", "LP 토큰 리스너 등록 취소", {
                    click: () => {
                        new Prompt("얼마만큼의 LP 토큰을 등록 취소하시겠습니까?", "등록 취소", async (amount) => {
                            const lp = utils.parseEther(amount);
                            await this.contract.unlisten(this.turntableId, lp);
                            ViewUtil.waitTransactionAndRefresh();
                        });
                    },
                }),
                el("a", "MIX 받기 허락", {
                    click: async () => {
                        await this.contract.unlisten(this.turntableId, 0);
                    },
                }),
                el("a", "MIX 받기", {
                    click: async () => {
                        await this.contract.claim(this.turntableId);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("p.warning", "* MIX 받기 허락을 먼저 수행하신 후, MIX 받기를 실행해주세요."),
            );
        }
    }
}
