import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class BuyMates implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("BUY_MATES_TITLE");
        Layout.current.content.append(this.container = el(".buymates-view",
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
