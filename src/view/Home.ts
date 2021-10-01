import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Loading from "../component/loading/Loading";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

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
                    el("a", `▶ ${msg("HOME_SECTION_2_LINK_1")}`, {
                        click: () => ViewUtil.go("/mates"),
                    }), "\n",
                    el("a", `▶ ${msg("HOME_SECTION_2_LINK_2")}`, {
                        click: () => ViewUtil.go("/activities"),
                    }), "\n",
                    "\n",
                    msg("HOME_SECTION_2_2"), "\n",
                    el("a", `▶ ${msg("HOME_SECTION_2_LINK_3")}`, { href: "https://opensea.io/collection/dogesoundclub-mates", target: "_blank" }), "\n",
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
            /*el("section",
                el("h2", msg("HOME_ROADMAP_TITLE")),
                el(".roadmap.percent30",
                    el("h3", "30 %"),
                    el("p",
                        msg("HOME_ROADMAP_30"), "\n",
                        el("a", `▶ ${msg("HOME_ROADMAP_DOGESOUND_LINK")}`, {
                            click: () => ViewUtil.go("/activities"),
                        }),
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
            ),*/
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
                el("h2", msg("HOME_PARTNET_TITLE")),
                el("ul.partners",
                    //el("li", el("a", el("img", { src: "/images/logo/groundx.png", srcset: "/images/logo/groundx@2x.png 2x" }), { href: "https://www.groundx.xyz/", target: "_blank" })),
                    el("li", el("a", el("img", { src: "/images/logo/ozys.png", srcset: "/images/logo/ozys@2x.png 2x" }), { href: "https://klayswap.com/", target: "_blank" })),
                    el("li", el("a", el("img", { src: "/images/logo/codestates.png", srcset: "/images/logo/codestates@2x.png 2x" }), { href: "https://www.codestates.com/", target: "_blank" })),
                    el("li", el("a", el("img", { src: "/images/logo/clone.png", srcset: "/images/logo/clone@2x.png 2x" }), { href: "https://clonesneverdie.com/", target: "_blank" })),
                    el("li", el("a", el("img", { src: "/images/logo/kate.png", srcset: "/images/logo/kate@2x.png 2x" }), { href: "https://www.casesbykate.xyz/", target: "_blank" })),
                    el("li", el("a", el("img", { src: "/images/logo/asianft.png", srcset: "/images/logo/asianft@2x.png 2x" }), { href: "https://discord.gg/HTm6hZGGxN", target: "_blank" })),
                    el("li", el("a", el("img", { src: "/images/logo/nftz.png", srcset: "/images/logo/nftz@2x.png 2x" }), { href: "https://nftz.co.in/", target: "_blank" })),
                    el("li", el("a", el("img", { src: "/images/logo/apunk.png", srcset: "/images/logo/apunk@2x.png 2x" }), { href: "https://animals-punks.com/", target: "_blank" })),
                ),
            ),
            el("section",
                el("h2", msg("HOME_CONTACT_TITLE")),
                el("p",
                    `- ${msg("HOME_CONTACT_KAKAOTALK")} : `, el("a", "https://open.kakao.com/o/gFJzBJ5c", { href: "https://open.kakao.com/o/gFJzBJ5c", target: "_blank" }), `(${msg("HOME_CONTACT_KAKAOTALK_PASSWORD")}) \n`,
                    `- ${msg("HOME_CONTACT_DISCORD")} : `, el("a", "https://discord.gg/RYxgb7dhMY", { href: "https://discord.gg/RYxgb7dhMY", target: "_blank" }), "\n",
                    `- ${msg("HOME_CONTACT_TELEGRAM")} : `, el("a", "https://t.me/dogesoundclub", { href: "https://t.me/dogesoundclub", target: "_blank" }), "\n",
                    `- ${msg("HOME_CONTACT_TWITTER")} : `, el("a", "https://twitter.com/dogesoundclub", { href: "https://twitter.com/dogesoundclub", target: "_blank" }), "\n",
                    `- ${msg("HOME_CONTACT_INSTAGRAM")} : @dogesoundclub\n`,
                    `- ${msg("HOME_CONTACT_MEDIUM")} : `, el("a", "https://medium.com/dogesoundclub", { href: "https://medium.com/dogesoundclub", target: "_blank" }), "\n",
                    `- ${msg("HOME_CONTACT_GITHUB")} : `, el("a", "https://github.com/dogesoundclub", { href: "https://github.com/dogesoundclub", target: "_blank" }), "\n",
                    `- ${msg("HOME_CONTACT_YOUTUBE")} : `, el("a", "https://www.youtube.com/channel/UCnt1jjJpL-YdHNcooykdY4w", { href: "https://www.youtube.com/channel/UCnt1jjJpL-YdHNcooykdY4w", target: "_blank" }), "\n",
                    `- ${msg("HOME_CONTACT_EMAIL")} : dogesoundclub @gmail.com`,
                ),
            ),
            el("section.tweet-container",
                el("a.twitter-timeline", {
                    "data-theme": "dark",
                    "data-height": "600",
                    href: "https://twitter.com/dogesoundclub?ref_src=twsrc%5Etfw",
                }),
                el("script", {
                    async: "async",
                    src: "https://platform.twitter.com/widgets.js",
                    charset: "utf-8"
                }),
            ),
        ));
        this.loadDogeSound();
    }

    private async loadDogeSound() {
        try {
            this.winner.append(new Loading());
            this.dogesound.append(new Loading());

            const result = await superagent.get("https://api.dogesound.club/dogesoundwinner");
            const winnerInfo = result.body;

            if (this.container.deleted !== true) {
                this.winner.empty().appendText(`${msg("HOME_WINNER_TITLE").replace(/{round}/, String(winnerInfo.round + 1))} `);
                this.winner.append(el("a", winnerInfo.winner, { href: `https://opensea.io/${winnerInfo.winner}`, target: "_blank" }));
                this.dogesound.empty().appendText(`${msg("HOME_WINNER_DESCRIPTION").replace(/{round}/, String(winnerInfo.round + 1))} \nㅡ ${winnerInfo.dogesound}`);
            }
        } catch (e) {
            this.dogesound.appendText(msg("HOME_WINNER_ERROR"));
            console.log(e);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
