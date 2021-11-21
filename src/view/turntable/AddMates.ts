import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../../CommonUtil";
import MateList from "../../component/mate/MateList";
import Config from "../../Config";
import MixEmitterContract from "../../contracts/mix/MixEmitterContract";
import MateContract from "../../contracts/nft/MateContract";
import MatesListenersContract from "../../contracts/turntable/MatesListenersContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class AddMates implements View {

    private container: DomNode;
    private mateRewardInfo: DomNode;
    private selectedMates: DomNode;
    private mateList: MateList;

    constructor(params: ViewParams) {
        const turntableId = parseInt(params.id, 10);
        Layout.current.title = "턴테이블에 메이트 등록하기";
        Layout.current.content.append(this.container = el(".add-mates-to-turntable-view",
            el("h1", "턴테이블에 메이트 등록하기"),
            el("a.back-button", "< 뒤로가기", {
                click: () => ViewUtil.go(`/turntable/${turntableId}`),
            }),
            el("p", "해당 턴테이블에 리스너로 등록할 메이트를 선택해주시기 바랍니다."),
            this.mateRewardInfo = el("p.mate-reward-info"),
            this.selectedMates = el(".selected-mates", msg("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(0))),
            el(".button-container", el("a", `▶ ${msg("DOGESOUNDS_MAX_SELECT_BUTTON")}`, {
                click: () => this.mateList.maxSelect(),
            })),
            el(".button-container", el("a", `▶ ${msg("DOGESOUNDS_DESELECT_BUTTON")}`, {
                click: () => this.mateList.deselect(),
            })),
            this.mateList = new MateList(true, false),
            el("a.submit-button", "메이트 등록", {
                click: async () => {
                    await MatesListenersContract.listen(
                        turntableId, this.mateList.selectedMateIds,
                    );
                    setTimeout(() => ViewUtil.go(`/turntable/${turntableId}`), 2000);
                },
            }),
        ));

        this.load();
        this.mateList.on("selectMate", () => {
            this.selectedMates.empty().appendText(msg("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(this.mateList.selectedMateIds.length)));
        });
    }

    private async load() {

        const poolInfo = await MixEmitterContract.poolInfo(Config.isTestnet === true ? 4 : 9);
        const tokenPerDay = poolInfo.allocPoint / 10000 * 86400 * 0.7;
        const totalShares = (await MatesListenersContract.totalShares()).toNumber();
        this.mateRewardInfo.empty().appendText(`메이트 1개당 하루에 받는 MIX 수량: ${CommonUtil.numberWithCommas(String(tokenPerDay / totalShares))}`);

        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            const mateBalance = (await MateContract.balanceOf(walletAddress)).toNumber();

            const mates: number[] = [];
            const votedMates: number[] = [];

            const promises: Promise<void>[] = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index: number) => {
                    const mateId = (await MateContract.tokenOfOwnerByIndex(walletAddress, index)).toNumber();
                    mates.push(mateId);
                    if (await MatesListenersContract.listening(mateId) === true) {
                        votedMates.push(mateId);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            this.mateList.load(mates, votedMates);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
