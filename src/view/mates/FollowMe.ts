import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Loading from "../../component/loading/Loading";
import MateInfoContract from "../../contracts/MateInfoContract";
import Layout from "../Layout";
import superagent from "superagent";

export default class FollowMe implements View {

    private container: DomNode;
    private list: DomNode;
    private loading: Loading | undefined;

    constructor() {
        Layout.current.title = msg("FOLLOW_ME_TITLE");
        Layout.current.content.append(this.container = el(".follow-me-view",
            el("h1", msg("FOLLOW_ME_TITLE")),
            el("p", msg("FOLLOW_ME_DESCRIPTION")),
            this.list = el("table",
                el("tr",
                    el("th"),
                    el("th", msg("FOLLOW_ME_TWITTER")),
                    el("th", msg("FOLLOW_ME_INSTAGRAM")),
                ),
            ),
            this.loading = new Loading(),
        ));
        this.load();
    }

    private async load() {

        const result = await superagent.get("https://api.dogesound.club/mate/names");
        const mateNames: { [id: number]: string } = result.body;

        const links = await MateInfoContract.links();
        for (const [id, link] of links.entries()) {
            if (link.twitter !== "" || link.instagram !== "") {
                this.list.append(
                    el("tr",
                        el("td",
                            el(".mate-item",
                                { style: { backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)` } },
                                el("span.id", `#${id}`),
                                el("span.name", mateNames[id]),
                            ),
                        ),
                        el("td", link.twitter === "" ? "" : el("a", `@${link.twitter}`, { href: `https://twitter.com/${link.twitter}`, target: "_blank" })),
                        el("td", link.instagram === "" ? "" : el("a", `@${link.instagram}`, { href: `https://instagram.com/${link.instagram}`, target: "_blank" })),
                    ),
                );
            }
        }

        this.loading?.delete();
        this.loading = undefined;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
