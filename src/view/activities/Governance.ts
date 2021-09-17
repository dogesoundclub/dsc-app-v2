import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class Governance implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("GOVERNANCE_TITLE");
        Layout.current.content.append(this.container = el(".governance-view",
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
