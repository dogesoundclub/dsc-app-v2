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
            el("p", "Work in Progress"),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
