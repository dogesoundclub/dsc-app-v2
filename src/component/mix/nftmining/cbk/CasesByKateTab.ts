import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../../../../CommonUtil";
import CasesByKatePoolContract from "../../../../contracts/mix/CasesByKatePoolContract";
import MixContract from "../../../../contracts/mix/MixContract";
import CasesByKateContract from "../../../../contracts/nft/CasesByKateContract";
import Wallet from "../../../../klaytn/Wallet";
import Confirm from "../../../../ui/dialogue/Confirm";
import Loading from "../../../loading/Loading";
import CaseItem from "./CaseItem";

export default class CasesByKateTab extends DomNode {

    private cases: number[] = [];
    private totalMix: BigNumber = BigNumber.from(0);
    private totalMixDisplay: DomNode;

    private list: DomNode;

    constructor() {
        super(".cases-by-kate-tab");
        this.append(
            el("header",
                el(".total-mix",
                    el("h4", "쌓인 총 MIX"),
                    this.totalMixDisplay = el("span", "Loading..."),
                ),
                el("a.take-all-button", "한꺼번에 받기", {
                    click: async () => {
                        if (await Wallet.connected() !== true) {
                            await Wallet.connect();
                        }
                        const owner = await Wallet.loadAddress();
                        if (owner !== undefined) {
                            const balance = await MixContract.balanceOf(owner);
                            const fee = this.totalMix.div(9);
                            if (balance.lt(fee)) {
                                new Confirm("NFT로부터 MIX를 수령받기 위해서는 수령받을 MIX의 10%의 MIX를 선납해야 합니다.", "믹스 구매", () => {
                                    open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                                });
                            } else {
                                if ((await MixContract.allowance(owner, CasesByKatePoolContract.address)).lt(fee)) {
                                    await MixContract.approve(CasesByKatePoolContract.address, fee);
                                    setTimeout(async () => {
                                        await CasesByKatePoolContract.claim(this.cases);
                                    }, 2000);
                                } else {
                                    await CasesByKatePoolContract.claim(this.cases);
                                }
                            }
                        }
                    },
                }),
            ),
            this.list = el(".case-list", new Loading()),
        );
        this.load();
    }

    private async load() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {

            const balance = (await CasesByKateContract.balanceOf(walletAddress)).toNumber();

            const promises: Promise<void>[] = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index: number) => {
                    const caseId = await CasesByKateContract.tokenOfOwnerByIndex(walletAddress, index);
                    this.cases.push(caseId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            this.list.empty();

            for (const caseId of this.cases) {
                new CaseItem(this, caseId).appendTo(this.list);
            }

        } else {
            this.list.empty();
        }
    }

    public changeMix(mix: BigNumber) {
        this.totalMix = this.totalMix.add(mix);
        this.totalMixDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(this.totalMix), 5));
    }
}
