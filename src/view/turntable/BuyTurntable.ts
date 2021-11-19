import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import TurntablesContract from "../../contracts/turntable/TurntablesContract";
import turntables from "../../turntables.json";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class BuyTurntable implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "턴테이블 구매";
        Layout.current.content.append(this.container = el(".buy-turntable-view",
            el("h1", "턴테이블 구매"),
            el("a.back-button", "< 뒤로가기", {
                click: () => ViewUtil.go("/turntable"),
            }),
            el("p", "턴테이블을 구매합니다. 턴테이블의 볼륨에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."),
            el("p.warning", "* 배터리 수명이 다 된 턴테이블은 배터리를 충전해야합니다. 배터리 충전 가격은 턴테이블의 가격의 절반과 비례하며, 턴테이블의 가격과 같은 액수의 MIX로 배터리를 충전하면 턴테이블 수명의 2배의 수명이 더해집니다."),
            el(".turntable-list",
                el("a.turntable",
                    el("h4", turntables[0].name, { style: { color: turntables[0].color } }),
                    el("img", { src: turntables[0].img }),
                    el(".volume", "Volume: 1,000"),
                    el(".price", "Price: 1,000 MIX"),
                    el(".lifetime", "Lifetime: 2,592,000 Blocks"),
                    el("a", "구매하기", {
                        click: async () => {
                            await TurntablesContract.buy(0);
                            setTimeout(() => ViewUtil.go("/turntable"), 2000);
                        },
                    }),
                ),
                el(".turntable",
                    el("h4", turntables[1].name, { style: { color: turntables[1].color } }),
                    el("img", { src: turntables[1].img }),
                    el(".volume", "Volume: 3,300"),
                    el(".price", "Price: 3,000 MIX"),
                    el(".lifetime", "Lifetime: 2,592,000 Blocks"),
                    el("a", "구매하기", {
                        click: async () => {
                            await TurntablesContract.buy(1);
                            setTimeout(() => ViewUtil.go("/turntable"), 2000);
                        },
                    }),
                ),
                el(".turntable",
                    el("h4", turntables[2].name, { style: { color: turntables[2].color } }),
                    el("img", { src: turntables[2].img }),
                    el(".volume", "Volume: 5,500"),
                    el(".price", "Price: 5,000 MIX"),
                    el(".lifetime", "Lifetime: 2,592,000 Blocks"),
                    el("a", "구매하기", {
                        click: async () => {
                            await TurntablesContract.buy(2);
                            setTimeout(() => ViewUtil.go("/turntable"), 2000);
                        },
                    }),
                ),
                el(".turntable",
                    el("h4", turntables[3].name, { style: { color: turntables[3].color } }),
                    el("img", { src: turntables[3].img }),
                    el(".volume", "Volume: 8,000"),
                    el(".price", "Price: 7,000 MIX"),
                    el(".lifetime", "Lifetime: 2,592,000 Blocks"),
                    el("a", "구매하기", {
                        click: async () => {
                            await TurntablesContract.buy(3);
                            setTimeout(() => ViewUtil.go("/turntable"), 2000);
                        },
                    }),
                ),
                el(".turntable",
                    el("h4", turntables[4].name, { style: { color: turntables[4].color } }),
                    el("img", { src: turntables[4].img }),
                    el(".volume", "Volume: 12,000"),
                    el(".price", "Price: 10,000 MIX"),
                    el(".lifetime", "Lifetime: 2,592,000 Blocks"),
                    el("a", "구매하기", {
                        click: async () => {
                            await TurntablesContract.buy(4);
                            setTimeout(() => ViewUtil.go("/turntable"), 2000);
                        },
                    }),
                ),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
