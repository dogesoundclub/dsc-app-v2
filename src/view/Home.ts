import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import SloganContract from "../contracts/SloganContract";
import Layout from "./Layout";

export default class Home implements View {

    private container: DomNode;
    private winner: DomNode;
    private dogesound: DomNode;

    constructor() {
        Layout.current.title = msg("HOME_TITLE");
        Layout.current.content.append(this.container = el(".home-view",
            el("img.logo", { src: "/images/logo/dogesoundclub.png", srcset: "/images/logo/dogesoundclub@2x.png 2x" }),
            el("header",
                el(".intro", msg("HOME_INTRO")),
                el(".description", msg("HOME_DESCRIPTION")),
                this.winner = el(".winner"),
                el(".dogesound",
                    el("img.talker", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-3.png" }),
                    this.dogesound = el(".text"),
                    el(".warning", msg("HOME_WINNER_WARNING")),
                ),
            ),
            el("section",
                el("h2", msg("HOME_SECTION_1_TITLE")),
                el("p", msg("HOME_SECTION_1")),
            ),
            el("section",
                el("header.mates",
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-0.png" }),
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-3.png" }),
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-6.png" }),
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-9.png" }),
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-12.png" }),
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-15.png" }),
                ),
                el("h2", msg("HOME_SECTION_2_TITLE")),
                el("p",
                    msg("HOME_SECTION_2_1"), "\n",
                    el("a", `▶ ${msg("HOME_SECTION_2_LINK_1")}`, { click: () => SkyRouter.go("/mates") }), "\n",
                    el("a", `▶ ${msg("HOME_SECTION_2_LINK_2")}`, { click: () => SkyRouter.go("/activities") }), "\n",
                    "\n",
                    msg("HOME_SECTION_2_2"), "\n",
                    el("a", `▶ ${msg("HOME_SECTION_2_LINK_3")}`, { href: "https://opensea.io/collection/dogesoundclub-mates" }), "\n",
                    msg("HOME_SECTION_2_3"),
                ),
            ),
            el("section",
                el("h2", msg("HOME_SECTION_3_TITLE")),
                el("p", msg("HOME_SECTION_3")),
                el("iframe.video", {
                    height: "486",
                    src: "https://www.youtube.com/embed/7Cwri2QKsAQ",
                    title: "YouTube video player",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                }),
            ),
            el("section",
                el("h2", msg("HOME_ROADMAP_TITLE")),
                el(".roadmap.percent30",
                    el("h3", "30 %"),
                    el("p",
                        msg("HOME_ROADMAP_30"), "\n",
                        el("a", `▶ ${msg("HOME_ROADMAP_DOGESOUND_LINK")}`, { click: () => SkyRouter.go("/activities") }),
                    ),
                ),
                el(".roadmap.percent50",
                    el("h3", "50 %"),
                    el("p", msg("HOME_ROADMAP_50")),
                ),
                el(".roadmap.percent70",
                    el("h3", "70 %"),
                    el("p", msg("HOME_ROADMAP_70")),
                ),
                el(".roadmap.percent100",
                    el("h3", "100 %"),
                    el("p", msg("HOME_ROADMAP_100")),
                ),
            ),
            el("section",
                el("h2", msg("HOME_SECTION_4_TITLE")),
                el(".team",
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-113.png" }),
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-2192.png" }),
                    el("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-5789.png" }),
                ),
                el("p", msg("HOME_SECTION_4")),
            ),
            el("section",
                el("h2", msg("HOME_CONTACT_TITLE")),
                el("p",
                    `- ${msg("HOME_CONTACT_KAKAOTALK")} : `, el("a", "https://open.kakao.com/o/gFJzBJ5c", { href: "https://open.kakao.com/o/gFJzBJ5c" }), `(${msg("HOME_CONTACT_KAKAOTALK_PASSWORD")}) \n`,
                    `- ${msg("HOME_CONTACT_DISCORD")} : `, el("a", "https://discord.gg/RYxgb7dhMY", { href: "https://discord.gg/RYxgb7dhMY" }), "\n",
                    `- ${msg("HOME_CONTACT_TWITTER")} : `, el("a", "https://twitter.com/dogesoundclub", { href: "https://twitter.com/dogesoundclub" }), "\n",
                    `- ${msg("HOME_CONTACT_INSTAGRAM")} : @dogesoundclub\n`,
                    `- ${msg("HOME_CONTACT_GITHUB")} : `, el("a", "https://github.com/dogesoundclub", { href: "https://github.com/dogesoundclub" }), "\n",
                    `- ${msg("HOME_CONTACT_YOUTUBE")} : `, el("a", "https://www.youtube.com/channel/UCnt1jjJpL-YdHNcooykdY4w", { href: "https://www.youtube.com/channel/UCnt1jjJpL-YdHNcooykdY4w" }), "\n",
                    `- ${msg("HOME_CONTACT_EMAIL")} : dogesoundclub @gmail.com`,
                ),
            ),
        ));
        this.loadDogeSound();
    }

    private async loadDogeSound() {
        try {
            const round = (await SloganContract.getRound()).toNumber() - 1;
            const elected = (await SloganContract.getElected(round)).toNumber();
            const dogesound = await SloganContract.getCandidate(round, elected);
            const winner = await SloganContract.getCandidateRegister(round, elected);

            this.winner.appendText(`${msg("HOME_WINNER_TITLE").replace(/{round}/, String(round + 1))} `);
            this.winner.append(el("a", winner, { href: `https://opensea.io/${winner}` }));
            this.dogesound.appendText(`${msg("HOME_WINNER_DESCRIPTION").replace(/{round}/, String(round + 1))} \nㅡ ${dogesound}`);
        } catch (e) {
            this.dogesound.appendText(msg("HOME_WINNER_ERROR"));
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
