import { DomNode, el } from "@hanul/skynode";
import { constants } from "ethers";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import TurntableItem from "../component/turntable/TurntableItem";
import MateContract from "../contracts/nft/MateContract";
import KlayMIXListenersContract from "../contracts/turntable/KlayMIXListenersContract";
import KSPMIXListenersContract from "../contracts/turntable/KSPMIXListenersContract";
import MatesListenersContract from "../contracts/turntable/MatesListenersContract";
import TurntablesContract from "../contracts/turntable/TurntablesContract";
import Klaytn from "../klaytn/Klaytn";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Turntable implements View {

    private container: DomNode;
    private myTurntableList: DomNode;
    private listeningTurntableList: DomNode;
    private totalVolumeDisplay: DomNode;
    private totalTurntableList: DomNode;

    constructor() {
        Layout.current.title = "턴테이블";
        Layout.current.content.append(this.container = el(".turntable-view",
            el("h1", "턴테이블"),
            el("p", "턴테이블은 MIX를 중~장기로 스테이킹하고자 하는 사용자들을 위한 시스템입니다. 턴테이블의 볼륨에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."),
            el("section",
                el("h2", "나의 턴테이블"),
                this.myTurntableList = el(".turntable-list"),
            ),
            el("a", "턴테이블 구매하기", { click: () => ViewUtil.go("/turntable/buy") }),
            el("section",
                el("h2", "리스닝중인 턴테이블"),
                this.listeningTurntableList = el(".turntable-list"),
            ),
            el("section",
                el("header",
                    el("h2", "전체 턴테이블"),
                    this.totalVolumeDisplay = el(".total-volume"),
                ),
                this.totalTurntableList = el(".turntable-list"),
            ),
        ));

        this.loadTotalVolume();
        this.loadTurntables();
    }

    private async loadTotalVolume() {
        const totalVolume = await TurntablesContract.totalVolume();
        this.totalVolumeDisplay.empty().appendText(`총 볼륨: ${CommonUtil.numberWithCommas(totalVolume.toString())}`);
    }

    private async loadTurntables() {

        const count = (await TurntablesContract.turntableLength()).toNumber();
        const walletAddress = await Wallet.loadAddress();
        const currentBlock = await Klaytn.loadBlockNumber();

        const matesTurntableIds: number[] = [];
        if (walletAddress !== undefined) {
            const balance = (await MateContract.balanceOf(walletAddress)).toNumber();
            const promises: Promise<void>[] = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index: number) => {
                    const mateId = await MateContract.tokenOfOwnerByIndex(walletAddress, index);
                    if (await MatesListenersContract.listening(mateId)) {
                        matesTurntableIds.push((await MatesListenersContract.listeningTo(mateId)).toNumber());
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
        }

        const promises: Promise<void>[] = [];
        for (let i = 0; i < count; i += 1) {
            const promise = async (id: number) => {
                try {
                    const turntable = await TurntablesContract.turntables(id);
                    if (this.container.deleted !== true) {
                        if (
                            matesTurntableIds.includes(id) === true || (
                                walletAddress !== undefined && (
                                    (await KlayMIXListenersContract.shares(id, walletAddress)).gt(0) ||
                                    (await KSPMIXListenersContract.shares(id, walletAddress)).gt(0)
                                )
                            )
                        ) {
                            new TurntableItem(id, currentBlock, turntable).appendTo(this.listeningTurntableList);
                        }
                        if (turntable.owner !== constants.AddressZero) {
                            if (turntable.owner === walletAddress) {
                                new TurntableItem(id, currentBlock, turntable, true).appendTo(this.myTurntableList);
                            }
                            new TurntableItem(id, currentBlock, turntable).appendTo(this.totalTurntableList);
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
