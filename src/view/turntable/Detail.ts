import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import MateList from "../../component/mate/MateList";
import TurntablesContract from "../../contracts/turntable/TurntablesContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Detail implements View {

    private container: DomNode;
    private title: DomNode;
    private infoDisplay: DomNode;
    private controller: DomNode;
    private listeningMateList: MateList;
    private myMateList: MateList;
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
                this.listeningMateList = new MateList(true, false),
            ),
            el("section",
                el("h2", "내 메이트 추가"),
                this.myMateList = new MateList(true, false),
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
        this.load(turntableId);
    }

    private async load(turntableId: number) {
        const turntable = await TurntablesContract.turntables(turntableId);
        const walletAddress = await Wallet.loadAddress();
        if (turntable.owner === walletAddress) {
            this.controller.empty().append(
                el("a.charge-button", "충전하기"),
                el("a.update-button", "수정하기", { click: () => ViewUtil.go(`/turntable/${turntableId}/update`) }),
            );
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
