import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import MatesListenersContract from "../../contracts/turntable/MatesListenersContract";
import MiningMates from "../../view/turntable/MiningMates";

export default class MateItem extends DomNode {

    private mixAmount: DomNode;
    private claimable: BigNumber = BigNumber.from(0);
    private refreshInterval: any;

    constructor(private view: MiningMates, private turntableId: number, private id: number, name: string | undefined) {
        super(".mate-item");
        this.append(
            el(".content",
                el(".mate",
                    { style: { backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)` } },
                    el("span.id", `#${id}`),
                    el("span.name", name),
                ),
                el(".info",
                    el("h5", "쌓인 MIX"),
                    this.mixAmount = el(".amount", "Loading..."),
                ),
                el(".controller",
                    el("a.claim-button", "받기", {
                        click: async () => {
                            await MatesListenersContract.claim(this.turntableId, [this.id]);
                        },
                    }),
                ),
            ),
        );
        this.load();
        this.refreshInterval = setInterval(() => this.load(), 1000);
    }

    private async load() {
        const claimable = await MatesListenersContract.claimableOf(this.turntableId, this.id);
        if (this.deleted !== true) {
            this.mixAmount.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(claimable), 5));
            this.view.changeMix(claimable.sub(this.claimable));
            this.claimable = claimable;
        }
    }

    public delete() {
        clearInterval(this.refreshInterval);
        super.delete();
    }
}
