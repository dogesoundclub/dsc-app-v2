import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class NFTMining implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("NFT_MINING_TITLE");
        Layout.current.content.append(this.container = el(".nftmining-view",
            el("h1", msg("NFT_MINING_TITLE")),
            el("p", "아래 NFT를 보유하고 있으면 MIX를 분배받게 됩니다. NFT 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다."),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
