import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("HOME_TITLE");
        Layout.current.content.append(this.container = el(".home-view",
            "이것은 테스트 메시지입니다.",
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
