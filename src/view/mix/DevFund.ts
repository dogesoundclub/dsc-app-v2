import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../../CommonUtil";
import Loading from "../../component/loading/Loading";
import DevFundPoolContract from "../../contracts/mix/DevFundPoolContract";
import DevFundTokenContract from "../../contracts/mix/DevFundTokenContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class DevFund implements View {

    private container: DomNode;

    private claimableDisplay: DomNode;
    private stakeInput: DomNode<HTMLInputElement>;
    private balanceDisplay: DomNode;
    private unstakeInput: DomNode<HTMLInputElement>;
    private stakedDisplay: DomNode;

    private refreshInterval: any;

    constructor() {
        Layout.current.title = "개발 펀드";
        Layout.current.content.append(this.container = el(".devfund-view",
            el("h1", "개발 펀드"),
            el("section",
                el("h2", "MIX 수령하기"),
                el(".balance",
                    el("span", "쌓인 MIX: "),
                    this.claimableDisplay = el("span", new Loading()),
                ),
                el("a", "수령하기", {
                    click: async () => {
                        await DevFundPoolContract.claim();
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            ),
            el("section",
                el("h2", "Dev Fund Token 예치하기"),
                this.stakeInput = el("input"),
                el(".info",
                    el(".balance",
                        el("span", "Dev Fund Token: "),
                        this.balanceDisplay = el("span", new Loading()),
                    ),
                    el("a", "최대 수량 입력", {
                        click: async () => {
                            const walletAddress = await Wallet.loadAddress();
                            if (walletAddress !== undefined) {
                                const balance = await DevFundTokenContract.balanceOf(walletAddress);
                                this.stakeInput.domElement.value = utils.formatEther(balance);
                            }
                        },
                    }),
                ),
                el("a", "예치하기", {
                    click: async () => {
                        await DevFundPoolContract.stake(utils.parseEther(this.stakeInput.domElement.value));
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("p.warning", "* 예치 시에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제 예치를 위한 것입니다."),
            ),
            el("section",
                el("h2", "Dev Fund Token 출금하기"),
                this.unstakeInput = el("input"),
                el(".info",
                    el(".balance",
                        el("span", "Staked: "),
                        this.stakedDisplay = el("span", new Loading()),
                    ),
                    el("a", "최대 수량 입력", {
                        click: async () => {
                            const walletAddress = await Wallet.loadAddress();
                            if (walletAddress !== undefined) {
                                const staked = await DevFundPoolContract.shares(walletAddress);
                                this.unstakeInput.domElement.value = utils.formatEther(staked);
                            }
                        },
                    }),
                ),
                el("a", "출금하기", {
                    click: async () => {
                        await DevFundPoolContract.unstake(utils.parseEther(this.unstakeInput.domElement.value));
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            ),
        ));
        this.load();

        this.refreshInterval = setInterval(async () => {
            const walletAddress = await Wallet.loadAddress();
            if (walletAddress !== undefined) {
                const claimable = await DevFundPoolContract.claimableOf(walletAddress);
                this.claimableDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(claimable)));
            }
        }, 1000);
    }

    private async load() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const claimable = await DevFundPoolContract.claimableOf(walletAddress);
            this.claimableDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(claimable)));

            const balance = await DevFundTokenContract.balanceOf(walletAddress);
            this.balanceDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(balance)));

            const staked = await DevFundPoolContract.shares(walletAddress);
            this.stakedDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(staked)));
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.refreshInterval);
        this.container.delete();
    }
}
