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
    ) {
        super(".lp-token-listeners");
        this.append(
            el("h4", name),
        );
        this.load();
    }

    private async load() {

        const poolInfo = await MixEmitterContract.poolInfo(this.poolId);
        const tokenPerBlock = poolInfo.allocPoint / 10000;
        const blocksPerYear = 365 * 24 * 60 * 60;

        const result = await superagent.get("https://api.dogesound.club/mix/price");
        const mixPrice = utils.parseEther(result.text);

        const totalShares = await this.contract.totalShares();
        const totalMixInLP = await MixContract.balanceOf(this.contract.lpToken.address);
        const lpTotalSupply = await this.contract.lpToken.getTotalSupply();
        const stakingTokenPrice = totalMixInLP.mul(mixPrice).div(lpTotalSupply);

        const totalRewardPricePerYear = mixPrice.mul(Math.round(tokenPerBlock * blocksPerYear));
        const totalStakingTokenInPool = totalShares.mul(stakingTokenPrice);

        const apr = totalStakingTokenInPool.eq(0) === true ? 0 : totalRewardPricePerYear.mul(10000).div(totalStakingTokenInPool).toNumber() / 100;

        this.append(
            el(".apr"),
            el(".total-lp", `총 LP: ${CommonUtil.numberWithCommas(utils.formatEther(totalShares))}`),
        );

        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const share = await this.contract.shares(this.turntableId, walletAddress);
            const lpBalance = await this.contract.lpToken.balanceOf(walletAddress);
            this.append(
                el(".staking-lp", `내가 넣은 LP: ${CommonUtil.numberWithCommas(utils.formatEther(share))}`),
                el(".my-lp", `내가 가진 LP: ${CommonUtil.numberWithCommas(utils.formatEther(lpBalance))}`),
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
            );
        }
    }
}
