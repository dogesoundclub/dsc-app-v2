import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import NameContract from "../../contracts/NameContract";
import Layout from "../Layout";

export default class MateDetail implements View {

    private id: number;

    private container: DomNode;
    private nameDisplay: DomNode;

    constructor(params: ViewParams) {
        this.id = parseInt(params.id, 10);
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        Layout.current.content.append(this.container = el(".matedetail-view",
            this.nameDisplay = el("h1"),
            el("img.mate-image", { src: `https://storage.googleapis.com/dsc-mate/336/dscMate-${this.id}.png` }),
            el("a.opensea-button", msg("MATE_DETAIL_OPENSEA_BUTTON"), { href: `https://opensea.io/assets/klaytn/0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae/${this.id}` }),
        ));
        this.loadName();
    }

    private async loadName() {
        this.nameDisplay.appendText(msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id)));
        const name = await NameContract.getName(this.id);
        if (name !== "") {
            this.nameDisplay.appendText(` - ${await NameContract.getName(this.id)}`);
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
    }

    public close(): void {
        this.container.delete();
    }
}
