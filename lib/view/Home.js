"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const Loading_1 = __importDefault(require("../component/loading/Loading"));
const Layout_1 = __importDefault(require("./Layout"));
class Home {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("HOME_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)("img.logo", { src: "/images/logo/dogesoundclub.png", srcset: "/images/logo/dogesoundclub@2x.png 2x" }), (0, skynode_1.el)("header", (0, skynode_1.el)(".intro", (0, msg_js_1.default)("HOME_INTRO")), (0, skynode_1.el)(".description", (0, msg_js_1.default)("HOME_DESCRIPTION")), this.winner = (0, skynode_1.el)(".winner"), (0, skynode_1.el)(".dogesound", (0, skynode_1.el)("img.talker", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-3.png" }), this.dogesound = (0, skynode_1.el)(".text"), (0, skynode_1.el)(".warning", (0, msg_js_1.default)("HOME_WINNER_WARNING")))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_SECTION_1_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_SECTION_1"))), (0, skynode_1.el)("section", (0, skynode_1.el)("header.mates", (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-0.png" }), (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-3.png" }), (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-6.png" }), (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-9.png" }), (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-12.png" }), (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-15.png" })), (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_SECTION_2_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_SECTION_2_1"), "\n", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("HOME_SECTION_2_LINK_1")}`, {
            click: () => {
                skyrouter_1.SkyRouter.go("/mates");
                window.scrollTo(0, 0);
            },
        }), "\n", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("HOME_SECTION_2_LINK_2")}`, {
            click: () => {
                skyrouter_1.SkyRouter.go("/activities");
                window.scrollTo(0, 0);
            },
        }), "\n", "\n", (0, msg_js_1.default)("HOME_SECTION_2_2"), "\n", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("HOME_SECTION_2_LINK_3")}`, { href: "https://opensea.io/collection/dogesoundclub-mates" }), "\n")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_SECTION_3_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_SECTION_3")), (0, skynode_1.el)("iframe.video", {
            height: "486",
            src: "https://www.youtube.com/embed/7Cwri2QKsAQ",
            title: "YouTube video player",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        })), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_ROADMAP_TITLE")), (0, skynode_1.el)(".roadmap.percent30", (0, skynode_1.el)("h3", "30 %"), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_ROADMAP_30"), "\n", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("HOME_ROADMAP_DOGESOUND_LINK")}`, {
            click: () => {
                skyrouter_1.SkyRouter.go("/activities");
                window.scrollTo(0, 0);
            },
        }))), (0, skynode_1.el)(".roadmap.percent50", (0, skynode_1.el)("h3", "50 %"), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_ROADMAP_50"))), (0, skynode_1.el)(".roadmap.percent70", (0, skynode_1.el)("h3", "70 %"), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_ROADMAP_70"))), (0, skynode_1.el)(".roadmap.percent100", (0, skynode_1.el)("h3", "100 %"), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_ROADMAP_100")))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_SECTION_4_TITLE")), (0, skynode_1.el)(".team", (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-113.png" }), (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-2192.png" }), (0, skynode_1.el)("img", { src: "https://storage.googleapis.com/dsc-mate/336/dscMate-5789.png" })), (0, skynode_1.el)("p", (0, msg_js_1.default)("HOME_SECTION_4"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOME_CONTACT_TITLE")), (0, skynode_1.el)("p", `- ${(0, msg_js_1.default)("HOME_CONTACT_KAKAOTALK")} : `, (0, skynode_1.el)("a", "https://open.kakao.com/o/gFJzBJ5c", { href: "https://open.kakao.com/o/gFJzBJ5c" }), `(${(0, msg_js_1.default)("HOME_CONTACT_KAKAOTALK_PASSWORD")}) \n`, `- ${(0, msg_js_1.default)("HOME_CONTACT_DISCORD")} : `, (0, skynode_1.el)("a", "https://discord.gg/RYxgb7dhMY", { href: "https://discord.gg/RYxgb7dhMY" }), "\n", `- ${(0, msg_js_1.default)("HOME_CONTACT_TWITTER")} : `, (0, skynode_1.el)("a", "https://twitter.com/dogesoundclub", { href: "https://twitter.com/dogesoundclub" }), "\n", `- ${(0, msg_js_1.default)("HOME_CONTACT_INSTAGRAM")} : @dogesoundclub\n`, `- ${(0, msg_js_1.default)("HOME_CONTACT_GITHUB")} : `, (0, skynode_1.el)("a", "https://github.com/dogesoundclub", { href: "https://github.com/dogesoundclub" }), "\n", `- ${(0, msg_js_1.default)("HOME_CONTACT_YOUTUBE")} : `, (0, skynode_1.el)("a", "https://www.youtube.com/channel/UCnt1jjJpL-YdHNcooykdY4w", { href: "https://www.youtube.com/channel/UCnt1jjJpL-YdHNcooykdY4w" }), "\n", `- ${(0, msg_js_1.default)("HOME_CONTACT_EMAIL")} : dogesoundclub @gmail.com`))));
        this.loadDogeSound();
    }
    async loadDogeSound() {
        try {
            this.winner.append(new Loading_1.default());
            this.dogesound.append(new Loading_1.default());
            const result = await superagent_1.default.get("https://api.dogesound.club/dogesoundwinner");
            const winnerInfo = result.body;
            this.winner.empty().appendText(`${(0, msg_js_1.default)("HOME_WINNER_TITLE").replace(/{round}/, String(winnerInfo.round + 1))} `);
            this.winner.append((0, skynode_1.el)("a", winnerInfo.winner, { href: `https://opensea.io/${winnerInfo.winner}` }));
            this.dogesound.empty().appendText(`${(0, msg_js_1.default)("HOME_WINNER_DESCRIPTION").replace(/{round}/, String(winnerInfo.round + 1))} \nㅡ ${winnerInfo.dogesound}`);
        }
        catch (e) {
            this.dogesound.appendText((0, msg_js_1.default)("HOME_WINNER_ERROR"));
            console.log(e);
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map