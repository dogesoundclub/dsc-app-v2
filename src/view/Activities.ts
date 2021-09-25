import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Activities implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("ACTIVITIES_TITLE");
        Layout.current.content.append(this.container = el(".activities-view",
            el("h1", msg("ACTIVITIES_TITLE")),
            el("section",
                el("p", msg("ACTIVITIES_SECTION_1")),
            ),
            el("section",
                el("h2", el("a", msg("ACTIVITIES_SECTION_2_TITLE"), {
                    click: () => ViewUtil.go("/dogesounds"),
                })),
                el("p", msg("ACTIVITIES_SECTION_2")),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
