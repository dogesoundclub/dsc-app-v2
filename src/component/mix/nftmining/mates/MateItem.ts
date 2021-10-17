import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../../../../CommonUtil";
import MatesPoolContract from "../../../../contracts/mix/MatesPoolContract";
import MixContract from "../../../../contracts/mix/MixContract";
import Wallet from "../../../../klaytn/Wallet";
import Confirm from "../../../../ui/dialogue/Confirm";
import MatesTab from "./MatesTab";

export default class MateItem extends DomNode {

    private mixAmount: DomNode;
    private claimable: BigNumber = BigNumber.from(0);
    private refreshInterval: any;

    constructor(private tab: MatesTab, private id: number, name: string | undefined) {
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
                            if (await Wallet.connected() !== true) {
                                await Wallet.connect();
                            }
                            const owner = await Wallet.loadAddress();
                            if (owner !== undefined) {
                                const balance = await MixContract.balanceOf(owner);
                                const fee = this.claimable.div(9);
                                if (balance.lt(fee)) {
                                    new Confirm("NFT로부터 MIX를 수령받기 위해서는 수령받을 MIX의 10%의 MIX를 선납해야 합니다.", "믹스 구매", () => {
                                        open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                                    });
                                } else {
                                    if ((await MixContract.allowance(owner, MatesPoolContract.address)).lt(fee)) {
                                        await MixContract.approve(MatesPoolContract.address, fee);
                                        setTimeout(async () => {
                                            await MatesPoolContract.claim([this.id]);
                                        }, 2000);
                                    } else {
                                        await MatesPoolContract.claim([this.id]);
                                    }
                                }
                            }
                        },
                    }),
                ),
            ),
        );
        this.load();
        this.refreshInterval = setInterval(() => this.load(), 1000);
    }

    private async load() {
        const claimable = await MatesPoolContract.claimableOf(this.id);
        if (this.deleted !== true) {
            this.mixAmount.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(claimable)));
            this.tab.changeMix(claimable.sub(this.claimable));
            this.claimable = claimable;
        }
    }

    public delete() {
        clearInterval(this.refreshInterval);
        super.delete();
    }
}
