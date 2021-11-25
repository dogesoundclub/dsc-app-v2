import { DomNode, el } from "@hanul/skynode";
import { constants, utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import Config from "../../Config";
import MixEmitterContract from "../../contracts/mix/MixEmitterContract";
import TurntablesContract from "../../contracts/turntable/TurntablesContract";
import turntables from "../../turntables.json";
import ViewUtil from "../../view/ViewUtil";

export default class BuyTurntableItem extends DomNode {

    private apr: DomNode;

    constructor(private typeId: number) {
        super(".buy-turntable-item");
        const turntable = turntables[typeId];
        this.append(
            el("h4", turntable.name, { style: { color: turntable.color } }),
            el("img", { src: turntable.img }),
            el(".volume", `Volume: ${CommonUtil.numberWithCommas(String(turntable.volume))}`),
            el(".price", `Price: ${CommonUtil.numberWithCommas(String(turntable.price))} MIX`),
            el(".lifetime", `Lifetime: ${CommonUtil.numberWithCommas(String(turntable.lifetime))} Blocks`),
            this.apr = el(".apr", `APR: Loading...`),
            el("a", "구매하기", {
                click: async () => {
                    await TurntablesContract.buy(typeId);
                    setTimeout(() => ViewUtil.go("/turntable"), 2000);
                },
            }),
        );
        this.loadAPR();
    }

    public async loadAPR() {
        const blocksPerYear = 365 * 24 * 60 * 60;

        const turntable = turntables[this.typeId];
        const turntablePrice = utils.parseEther(String(turntable.price));
        const batteryPrice = utils.parseEther(String(turntable.price)).div(5);
        const annualBatteryCost = batteryPrice.mul(utils.parseEther((blocksPerYear / turntable.lifetime - 1).toFixed(18))).div(constants.WeiPerEther);

        const annualCost = turntablePrice.add(annualBatteryCost);

        const poolInfo = await MixEmitterContract.poolInfo(Config.isTestnet === true ? 3 : 8);
        const tokenPerBlock = poolInfo.allocPoint / 10000;

        const totalVolumne = await TurntablesContract.totalVolume();
        const totalRewardPerYear = utils.parseEther(String(tokenPerBlock * blocksPerYear)).sub((turntablePrice.mul(2).div(10)).add(annualBatteryCost));

        const apr = totalRewardPerYear.mul(10000).mul(turntable.volume).div(totalVolumne).div(annualCost).toNumber() / 100;
        this.apr.empty().appendText(`APR: ${apr}%`);
    }
}
