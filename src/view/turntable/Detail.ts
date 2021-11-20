import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../../CommonUtil";
import MateList from "../../component/mate/MateList";
import MateContract from "../../contracts/nft/MateContract";
import MatesListenersContract from "../../contracts/turntable/MatesListenersContract";
import TurntableExtrasContract from "../../contracts/turntable/TurntableExtrasContract";
import TurntablesContract from "../../contracts/turntable/TurntablesContract";
import Klaytn from "../../klaytn/Klaytn";
import Wallet from "../../klaytn/Wallet";
import Prompt from "../../ui/dialogue/Prompt";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Detail implements View {

    private container: DomNode;
    private title: DomNode;
    private infoDisplay: DomNode;
    private controller: DomNode;
    private listeningMateList: MateList;
    private klayMixInfo: DomNode;
    private kspMixInfo: DomNode;

    constructor(params: ViewParams) {
        const turntableId = parseInt(params.id, 10);
        Layout.current.title = "턴테이블";
        Layout.current.content.append(this.container = el(".turntable-detail-view",
            this.title = el("h1", "턴테이블"),
            el("a.back-button", "< 뒤로가기", {
                click: () => ViewUtil.go("/turntable"),
            }),
            this.infoDisplay = el(".info"),
            this.controller = el(".controller"),
            el("section",
                el("h2", "리스닝 메이트"),
                this.listeningMateList = new MateList(false, false),
            ),
            el(".controller",
                el("a.add-mates-button", "메이트 등록", {
                    click: () => ViewUtil.go(`/turntable/${turntableId}/addmates`),
                }),
                el("a.remove-mates-button", "메이트 제외", {
                    click: () => ViewUtil.go(`/turntable/${turntableId}/removemates`),
                }),
            ),
            el("section",
                el("h2", "리스닝 LP Token"),
                el(".listening-lp",
                    el("h3", "Klay-MIX Listeners"),
                    this.klayMixInfo = el(".info"),
                ),
                el(".listening-lp",
                    el("h3", "KSP-MIX Listeners"),
                    this.kspMixInfo = el(".info"),
                ),
            ),
        ));
        this.loadInfo(turntableId);
        this.loadListeningMates(turntableId);
    }

    private async loadInfo(turntableId: number) {
        const currentBlock = await Klaytn.loadBlockNumber();
        const walletAddress = await Wallet.loadAddress();

        const turntable = await TurntablesContract.turntables(turntableId);
        const lifetime = turntable.endBlock - currentBlock;
        const claimable = await TurntablesContract.claimableOf(turntableId);
        const extra = await TurntableExtrasContract.extras(turntableId);

        let data: any = {};
        try { data = JSON.parse(extra); } catch (e) { console.error(e); }

        if (data.name !== undefined) {
            Layout.current.title = data.name;
            this.title.empty().appendText(data.name);
        }

        this.infoDisplay.empty();
        if (data.bgm !== undefined) {
            const v = data.bgm.indexOf("?v=");
            this.infoDisplay.append(
                el("iframe.video", {
                    height: "200",
                    src: v === -1 ? data.bgm : `https://www.youtube.com/embed/${data.bgm.substring(v + 3)}`,
                    title: "YouTube video player",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                }),
            );
        }
        if (data.description !== undefined) {
            this.infoDisplay.append(
                el("p", data.description),
            );
        }
        if (data.kakaotalk !== undefined) {
            this.infoDisplay.append(
                el(".social", "- 카카오톡 : ", el("a", data.kakaotalk, { href: data.kakaotalk, target: "_blank" })),
            );
        }
        if (data.twitter !== undefined) {
            this.infoDisplay.append(
                el(".social", "- 트위터 : ", el("a", data.twitter, { href: data.twitter, target: "_blank" })),
            );
        }

        this.infoDisplay.append(
            el(".owner", `- 소유자: ${turntable.owner}`),
            turntable.owner !== walletAddress ? undefined : el(".mix", `- 쌓인 MIX: ${CommonUtil.numberWithCommas(utils.formatEther(claimable), 5)}`),
            el(".lifetime", `- Lifetime: ${CommonUtil.numberWithCommas(String(lifetime < 0 ? 0 : lifetime))} Blocks`),
        );

        if (turntable.owner === walletAddress) {
            this.controller.empty().append(
                el("a.charge-button", "충전하기", {
                    click: () => {
                        new Prompt("얼마만큼의 MIX를 충전하시겠습니까? 배터리 충전 가격은 턴테이블의 가격의 절반과 비례하며, 턴테이블의 가격과 같은 액수의 MIX로 배터리를 충전하면 턴테이블 수명의 2배의 수명이 더해집니다.", "충전하기", async (amount) => {
                            const mix = utils.parseEther(amount);
                            await TurntablesContract.charge(turntableId, mix);
                            ViewUtil.waitTransactionAndRefresh();
                        });
                    },
                }),
                el("a.update-button", "수정하기", { click: () => ViewUtil.go(`/turntable/${turntableId}/update`) }),
            );
        }
    }

    private async loadListeningMates(turntableId: number) {
        const mateBalance = (await MatesListenersContract.listenerCount(turntableId)).toNumber();

        const mates: number[] = [];

        const promises: Promise<void>[] = [];
        for (let i = 0; i < mateBalance; i += 1) {
            const promise = async (index: number) => {
                const mateId = (await MatesListenersContract.listeners(turntableId, index)).toNumber();
                mates.push(mateId);
            };
            promises.push(promise(i));
        }
        await Promise.all(promises);

        this.listeningMateList.load(mates);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
