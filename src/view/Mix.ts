import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mix implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("MIX_TITLE");
        Layout.current.content.append(this.container = el(".mix-view",
            el("h1", msg("MIX_TITLE")),
            el("p", "MIX는 NFT 프로젝트들의 허브를 위한 토큰입니다. DSC 사이트의 전 범위에서 사용되며, Klayswap에서 유동성 공급 및 거래에 사용될 예정입니다. 또한 MIX를 활용한 기능을 추가하기로 약속한 파트너 프로젝트의 서비스에서도 사용될 예정입니다."),
            el("a", "MIX 백서 보기", { href: "https://medium.com/dogesoundclub/dsc-mix-nft-%ED%97%88%EB%B8%8C%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%86%A0%ED%81%B0-3299dd3a8d1d", target: "_blank" }),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
