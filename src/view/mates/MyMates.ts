import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";

export default class MyMates implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("MY_MATES_TITLE");
        Layout.current.content.append(this.container = el(".mymates-view",
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
