import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import TurntableExtrasContract from "../../contracts/turntable/TurntableExtrasContract";
import TurntablesContract from "../../contracts/turntable/TurntablesContract";
import Confirm from "../../ui/dialogue/Confirm";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Update implements View {

    private container: DomNode;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionTextarea: DomNode<HTMLInputElement>;
    private bgmInput: DomNode<HTMLInputElement>;
    private twitterInput: DomNode<HTMLInputElement>;
    private kakaotalkInput: DomNode<HTMLInputElement>;

    constructor(params: ViewParams) {
        const turntableId = parseInt(params.id, 10);
        Layout.current.title = "턴테이블 정보 수정";
        Layout.current.content.append(this.container = el(".update-turntable-view",
            el("h1", "턴테이블 정보 수정"),
            el("a.back-button", "< 뒤로가기", {
                click: () => ViewUtil.go(`/turntable/${turntableId}`),
            }),
            el(".form",
                el("label",
                    el("h4", "턴테이블 이름"),
                    this.nameInput = el("input", { placeholder: "턴테이블 이름" }),
                ),
                el("label",
                    el("h4", "턴테이블 설명"),
                    this.descriptionTextarea = el("textarea", { placeholder: "턴테이블 설명" }),
                ),
                el("label",
                    el("h4", "BGM 유튜브 링크"),
                    this.bgmInput = el("input", { placeholder: "BGM 유튜브 링크" }),
                ),
                el("label",
                    el("h4", "관련 트위터"),
                    this.twitterInput = el("input", { type: "url", placeholder: "관련 트위터" }),
                ),
                el("label",
                    el("h4", "관련 카카오톡 오픈 채팅방"),
                    this.kakaotalkInput = el("input", { type: "url", placeholder: "관련 카카오톡 오픈 채팅방" }),
                ),
                el("a.save-button", "저장하기", {
                    click: async () => {
                        const extra = {
                            name: this.nameInput.domElement.value,
                            description: this.descriptionTextarea.domElement.value,
                            bgm: this.bgmInput.domElement.value,
                            twitter: this.twitterInput.domElement.value,
                            kakaotalk: this.kakaotalkInput.domElement.value,
                        };
                        await TurntableExtrasContract.set(turntableId, JSON.stringify(extra));
                        setTimeout(() => ViewUtil.go(`/turntable/${turntableId}`), 2000);
                    },
                }),
                el("a.destroy-button", "폐쇄하기", {
                    click: () => {
                        new Confirm("턴테이블을 폐쇄하시겠습니까? 턴테이블을 폐쇄하면 턴테이블 구매 비용의 80%를 되돌려받습니다. 이 작업은 돌이킬 수 없습니다.", "폐쇄하기", async () => {
                            await TurntablesContract.destroy(turntableId);
                            setTimeout(() => ViewUtil.go("/turntable"), 2000);
                        });
                    },
                }),
            ),
        ));
        this.load(turntableId);
    }

    private async load(turntableId: number) {
        const extra = await TurntableExtrasContract.extras(turntableId);
        if (extra.trim() !== "") {
            let data: any = {};
            try { data = JSON.parse(extra); } catch (e) { console.error(e); }

            this.nameInput.domElement.value = data.name === undefined ? "" : data.name;
            this.descriptionTextarea.domElement.value = data.description === undefined ? "" : data.description;
            this.bgmInput.domElement.value = data.bgm === undefined ? "" : data.bgm;
            this.kakaotalkInput.domElement.value = data.kakaotalk === undefined ? "" : data.kakaotalk;
            this.twitterInput.domElement.value = data.twitter === undefined ? "" : data.twitter;
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
