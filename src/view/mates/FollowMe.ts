import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Loading from "../../component/loading/Loading";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

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

        const getNamesResult = await superagent.get("https://api.dogesound.club/mate/names");
        const mateNames: { [id: number]: string } = getNamesResult.body;

        const getLinksResult = await superagent.get("https://api.dogesound.club/mate/links");
        const links: {
            [id: number]: {
                twitter?: string,
                instagram?: string,
            },
        } = getLinksResult.body;

        const exists: { [key: string]: boolean } = {};

        for (const [id, link] of Object.entries(links)) {
            if (
                (link.twitter !== undefined || link.instagram !== undefined) &&
                exists["" + link.twitter + link.instagram] !== true
            ) {
                this.list.append(
                    el("tr",
                        el("td",
                            el("a.mate-item",
                                { style: { backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)` } },
                                el("span.id", `#${id}`),
                                el("span.name", mateNames[id as any]),
                                { click: () => ViewUtil.go(`/mates/${id}`) },
                            ),
                        ),
                        el("td", link.twitter === undefined ? "" : el("a", `@${link.twitter}`, { href: `https://twitter.com/${link.twitter}`, target: "_blank" })),
                        el("td", link.instagram === undefined ? "" : el("a", `@${link.instagram}`, { href: `https://instagram.com/${link.instagram}`, target: "_blank" })),
                    ),
                );
                exists["" + link.twitter + link.instagram] = true;
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
