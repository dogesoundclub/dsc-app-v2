import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../../CommonUtil";
import Loading from "../../component/loading/Loading";
import BoothContract from "../../contracts/mix/BoothContract";
import MixContract from "../../contracts/mix/MixContract";
import Klaytn from "../../klaytn/Klaytn";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Booth implements View {

    private container: DomNode;

    private aprDisplay: DomNode;
    private priceDisplay: DomNode;
    private stakeInput: DomNode<HTMLInputElement>;
    private balanceDisplay: DomNode;
    private unstakeInput: DomNode<HTMLInputElement>;
    private mixsetDisplay: DomNode;

    constructor() {
        Layout.current.title = msg("BOOTH_TITLE");
        Layout.current.content.append(this.container = el(".booth-view",
            el("h1", msg("BOOTH_TITLE")),
            el("p", "MIX가 소각될 때 마다 소각량의 0.3%가 부스에 대한 지분에 따라 분배됩니다. MIX를 부스에 스테이킹하면 부스의 지분에 해당하는 MIXSET을 받게 됩니다. MIXSET은 지속적으로 복리 이자를 생성하며, 스테이킹 해제 시 원금 MIX와 수수료 이자를 함께 돌려받게 됩니다."),
            el("section",
                el(".price",
                    el("span", "1 MIXSET = "),
                    this.priceDisplay = el("span", new Loading()),
                    el("span", " MIX"),
                ),
                el(".apr",
                    el("span", "지난 24시간 동안의 APR: "),
                    this.aprDisplay = el("span", new Loading()),
                    el("span", "%"),
                ),
                el("p.warning", "* ARP은 지난 24시간의 기록을 365일로 늘려서 계산된 것입니다. 따라서 매일 변경될 수 있습니다."),
            ),
            el("section",
                el("h2", "MIX 스테이킹"),
                this.stakeInput = el("input"),
                el(".info",
                    el(".balance",
                        el("span", "MIX: "),
                        this.balanceDisplay = el("span", new Loading()),
                    ),
                    el("a", "최대 수량 입력", {
                        click: async () => {
                            const walletAddress = await Wallet.loadAddress();
                            if (walletAddress !== undefined) {
                                const balance = await MixContract.balanceOf(walletAddress);
                                this.stakeInput.domElement.value = utils.formatEther(balance);
                            }
                        },
                    }),
                ),
                el("a", "예치하기", {
                    click: async () => {
                        await BoothContract.stake(utils.parseEther(this.stakeInput.domElement.value));
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("p.warning", "* 예치 시에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제 예치를 위한 것입니다."),
            ),
            el("section",
                el("h2", "스테이킹 해제"),
                this.unstakeInput = el("input"),
                el(".info",
                    el(".balance",
                        el("span", "MIXSET: "),
                        this.mixsetDisplay = el("span", new Loading()),
                    ),
                    el("a", "최대 수량 입력", {
                        click: async () => {
                            const walletAddress = await Wallet.loadAddress();
                            if (walletAddress !== undefined) {
                                const staked = await BoothContract.balanceOf(walletAddress);
                                this.unstakeInput.domElement.value = utils.formatEther(staked);
                            }
                        },
                    }),
                ),
                el("a", "해제하기", {
                    click: async () => {
                        await BoothContract.unstake(utils.parseEther(this.unstakeInput.domElement.value));
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            ),
        ));
        this.loadInfo();
        this.loadBalance();
    }

    private async loadInfo() {

        const totalMix = await MixContract.balanceOf(BoothContract.address);
        const totalMixset = await BoothContract.getTotalSupply();

        if (totalMixset.eq(0)) {
            this.priceDisplay.empty().appendText("1");
        } else {
            this.priceDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(totalMix.mul(BigNumber.from("1000000000000000000")).div(totalMixset))));
        }

        if (totalMix.eq(0)) {
            this.aprDisplay.empty().appendText("0");
        } else {
            const currentBlock = await Klaytn.loadBlockNumber();
            const transferEvents = await MixContract.getTransferEvents(BoothContract.address, currentBlock - 86400, currentBlock);
            let total24 = BigNumber.from(0);
            for (const event of transferEvents) {
                total24 = total24.add(event.returnValues[2]);
            }
            const stakeEvents = await BoothContract.getStakeEvents(currentBlock - 86400, currentBlock);
            for (const event of stakeEvents) {
                total24 = total24.sub(event.returnValues[1]);
            }
            const apr = total24.mul(36500).div(totalMix);
            this.aprDisplay.empty().appendText(CommonUtil.numberWithCommas(apr.toString()));
        }
    }

    private async loadBalance() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const balance = await MixContract.balanceOf(walletAddress);
            this.balanceDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(balance)));

            const mixset = await BoothContract.balanceOf(walletAddress);
            this.mixsetDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(mixset)));
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
