import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Turntables implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("TURNTABLES_TITLE");
        Layout.current.content.append(this.container = el(".turntables-view",
            el("h1", msg("TURNTABLES_TITLE")),
            el("p", el("a", "턴테이블 및 리스너 소개 및 출시 일정 보기", {
                href: "https://medium.com/dogesoundclub/%ED%84%B4%ED%85%8C%EC%9D%B4%EB%B8%94-%EB%B0%8F-%EB%A6%AC%EC%8A%A4%EB%84%88-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EC%B6%9C%EC%8B%9C-%EC%9D%BC%EC%A0%95-c0f2efe81587",
                target: "_blank",
            })),
            el(".turntable-list",
                el(".turntable",
                    el("h4", "Normal Grade", { style: { color: "#d6d6d6" } }),
                    el("img", { src: "/images/components/turntables/normal.png" }),
                    el(".volume", "Volume: 1,000"),
                    el(".price", "Price: 1,000 MIX"),
                ),
                el(".turntable",
                    el("h4", "Fine Grade", { style: { color: "#6cb2e3" } }),
                    el("img", { src: "/images/components/turntables/fine.png" }),
                    el(".volume", "Volume: 3,300"),
                    el(".price", "Price: 3,000 MIX"),
                ),
                el(".turntable",
                    el("h4", "Rare Grade", { style: { color: "#dbcf74" } }),
                    el("img", { src: "/images/components/turntables/rare.png" }),
                    el(".volume", "Volume: 5,500"),
                    el(".price", "Price: 5,000 MIX"),
                ),
                el(".turntable",
                    el("h4", "Epic Grade", { style: { color: "#f5a360" } }),
                    el("img", { src: "/images/components/turntables/epic.png" }),
                    el(".volume", "Volume: 8,000"),
                    el(".price", "Price: 7,000 MIX"),
                ),
                el(".turntable",
                    el("h4", "Supremacy Grade", { style: { color: "#e6500e" } }),
                    el("img", { src: "/images/components/turntables/supremacy.png" }),
                    el(".volume", "Volume: 12,000"),
                    el(".price", "Price: 10,000 MIX"),
                ),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
