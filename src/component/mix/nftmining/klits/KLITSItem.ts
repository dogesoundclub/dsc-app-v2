import { DomNode, el } from "@hanul/skynode";
import { BigNumber, constants, utils } from "ethers";
import CommonUtil from "../../../../CommonUtil";
import MixContract from "../../../../contracts/mix/MixContract";
import KLITSPoolContract from "../../../../contracts/mix/KLITSPoolContract";
import KLITSContract from "../../../../contracts/nft/KLITSContract";
import Wallet from "../../../../klaytn/Wallet";
import KlubsLoader from "../../../../KlubsLoader";
import Confirm from "../../../../ui/dialogue/Confirm";
import KLITSTab from "./KLITSTab";

export default class KLITSItem extends DomNode {

    private klits: DomNode;
    private mixAmount: DomNode;
    private claimable: BigNumber = BigNumber.from(0);
    private refreshInterval: any;

    constructor(private tab: KLITSTab, private id: number) {
        super(".klits-item");
        this.append(
            el(".content",
                this.klits = el(".klits",
                    el("span.id", `#${id}`),
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
                                    if ((await MixContract.allowance(owner, KLITSPoolContract.address)).lt(fee)) {
                                        await MixContract.approve(KLITSPoolContract.address, constants.MaxUint256);
                                        setTimeout(async () => {
                                            await KLITSPoolContract.claim([this.id]);
                                        }, 2000);
                                    } else {
                                        await KLITSPoolContract.claim([this.id]);
                                    }
                                }
                            }
                        },
                    }),
                ),
            ),
        );
        this.loadImage();
        this.load();
        this.refreshInterval = setInterval(() => this.load(), 1000);
    }

    private async loadImage() {
        const metadata = await KlubsLoader.loadMetadata(KLITSContract.address, this.id);
        this.klits.style({ backgroundImage: `url(${metadata.image})` });
    }

    private async load() {
        const claimable = await KLITSPoolContract.claimableOf(this.id);
        if (this.deleted !== true) {
            this.mixAmount.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(claimable), 5));
            this.tab.changeMix(claimable.sub(this.claimable));
            this.claimable = claimable;
        }
    }

    public delete() {
        clearInterval(this.refreshInterval);
        super.delete();
    }
}
