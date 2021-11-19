import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Turntable implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "턴테이블";
        Layout.current.content.append(this.container = el(".turntable-view",
            el("h1", "턴테이블"),
            el("p", "턴테이블은 MIX를 중~장기로 스테이킹하고자 하는 사용자들을 위한 시스템입니다. 턴테이블의 볼륨에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."),
            el("section",
                el("h2", "나의 턴테이블"),
            ),
            el("a", "턴테이블 구매하기", { click: () => ViewUtil.go("/turntable/buy") }),
            el("section",
                el("h2", "리스닝중인 턴테이블"),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
