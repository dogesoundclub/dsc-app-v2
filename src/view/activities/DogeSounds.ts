import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import RankList from "../../component/dogesounds/RankList";
import Layout from "../Layout";

export default class DogeSounds implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("DOGESOUNDS_TITLE");
        Layout.current.content.append(this.container = el(".dogesounds-view",
            el("h1", msg("DOGESOUNDS_TITLE")),
            el("img.top-image", {
                src: "/images/view/dogesounds/top.png",
                srcset: "/images/view/dogesounds/top@2x.png 2x",
            }),
            el("section",
                el("h2", msg("DOGESOUNDS_RULE_TITLE")),
                el("p", msg("DOGESOUNDS_RULE_1")),
                el("p.warning", `* ${msg("DOGESOUNDS_RULE_WARNING")}`),
                el("p", msg("DOGESOUNDS_RULE_2")),
            ),
            el("section",
                el("h2", msg("DOGESOUNDS_WINNERS_TITLE")),
                new RankList(),
            ),
            el("section",
                el("h2", msg("DOGESOUNDS_STATUS_TITLE")),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
