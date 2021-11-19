import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Update implements View {

    private container: DomNode;

    constructor(params: ViewParams) {
        Layout.current.title = "턴테이블 정보 수정";
        Layout.current.content.append(this.container = el(".update-turntable-view",
            el("h1", "턴테이블 정보 수정"),
            el("a.back-button", "< 뒤로가기", {
                click: () => ViewUtil.go(`/turntable/${params.id}`),
            }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
