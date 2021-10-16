import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../../CommonUtil";
import Loading from "../../component/loading/Loading";
import BurnPoolContract from "../../contracts/mix/BurnPoolContract";
import MixEmitterContract from "../../contracts/mix/MixEmitterContract";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class BurnPool implements View {

    private container: DomNode;
    private burnableDisplay: DomNode;
    private refreshInterval: any;

    constructor() {
        Layout.current.title = "소각 풀";
        Layout.current.content.append(this.container = el(".burnpool-view",
            el("h1", "소각 풀"),
            el("section",
                el("h2", "MIX 소각하기"),
                el(".balance",
                    el("span", "쌓인 MIX: "),
                    this.burnableDisplay = el("span", new Loading()),
                ),
                el("a", "소각하기", {
                    click: async () => {
                        await BurnPoolContract.burn();
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            ),
        ));
        this.load();

        this.refreshInterval = setInterval(async () => {
            const pid = await BurnPoolContract.getPoolId();
            const burnable = await MixEmitterContract.pendingMix(pid);
            this.burnableDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(burnable)));
        }, 1000);
    }

    private async load() {
        const pid = await BurnPoolContract.getPoolId();
        const burnable = await MixEmitterContract.pendingMix(pid);
        this.burnableDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(burnable)));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.refreshInterval);
        this.container.delete();
    }
}
