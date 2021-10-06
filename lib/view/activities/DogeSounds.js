"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const MintForm_1 = __importDefault(require("../../component/dogesounds/MintForm"));
const RankList_1 = __importDefault(require("../../component/dogesounds/RankList"));
const RegisterCandidateForm_1 = __importDefault(require("../../component/dogesounds/RegisterCandidateForm"));
const VoteForm_1 = __importDefault(require("../../component/dogesounds/VoteForm"));
const DogeSoundContestV2Contract_1 = __importDefault(require("../../contracts/DogeSoundContestV2Contract"));
const Layout_1 = __importDefault(require("../Layout"));
class DogeSounds {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("DOGESOUNDS_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".dogesounds-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("DOGESOUNDS_TITLE")), (0, skynode_1.el)("img.top-image", {
            src: "/images/view/dogesounds/top.png",
            srcset: "/images/view/dogesounds/top@2x.png 2x",
        }), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DOGESOUNDS_RULE_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_RULE_1")), (0, skynode_1.el)("p.warning", `* ${(0, msg_js_1.default)("DOGESOUNDS_RULE_WARNING")}`), (0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_RULE_2")), (0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_RULE_3")), (0, skynode_1.el)("a.opensea-link", (0, msg_js_1.default)("DOGESOUNDS_OPENSEA_LINK"), { href: "https://opensea.io/collection/dsc-dogesound-winners", target: "_blank" })), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DOGESOUNDS_WINNERS_TITLE")), new RankList_1.default()), this.status = (0, skynode_1.el)("section.status", (0, skynode_1.el)("h2", (0, msg_js_1.default)("DOGESOUNDS_STATUS_TITLE")), this.periodTriangle = (0, skynode_1.el)(".period-triangle"))));
        this.load();
    }
    async load() {
        const currentRound = (await DogeSoundContestV2Contract_1.default.getRound()).toNumber();
        const period = (await DogeSoundContestV2Contract_1.default.getPeriod()).toNumber();
        let remains = (await DogeSoundContestV2Contract_1.default.getRemains()).toNumber();
        this.form?.delete();
        if (period === DogeSoundContestV2Contract_1.default.HOLIDAY_PERIOD) {
            this.periodTriangle.append((0, skynode_1.el)("img", {
                src: "/images/components/dogesounds/period-holiday.png",
                srcset: "/images/components/dogesounds/period-holiday@2x.png 2x",
            }));
            this.status.append((0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_HOLIDAY_DESCRIPTION").replace(/{round}/, String(currentRound))), (0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_HOLIDAY_DESCRIPTION_2")));
            this.form = new MintForm_1.default(currentRound - 1).appendTo(this.container);
        }
        else if (period === DogeSoundContestV2Contract_1.default.REGISTER_CANDIDATE_PERIOD) {
            this.periodTriangle.append((0, skynode_1.el)("img", {
                src: "/images/components/dogesounds/period-register.png",
                srcset: "/images/components/dogesounds/period-register@2x.png 2x",
            }));
            this.status.append((0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_REGISTER_CANDIDATE_DESCRIPTION").replace(/{round}/, String(currentRound + 1))));
            this.form = new RegisterCandidateForm_1.default(currentRound).appendTo(this.container);
        }
        else if (period === DogeSoundContestV2Contract_1.default.VOTE_PERIOD) {
            this.periodTriangle.append((0, skynode_1.el)("img", {
                src: "/images/components/dogesounds/period-vote.png",
                srcset: "/images/components/dogesounds/period-vote@2x.png 2x",
            }));
            this.status.append((0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_VOTE_DESCRIPTION").replace(/{round}/, String(currentRound + 1))));
            this.form = new VoteForm_1.default(currentRound).appendTo(this.container);
        }
        this.periodTriangle.append((0, skynode_1.el)(`span.holiday${period === DogeSoundContestV2Contract_1.default.HOLIDAY_PERIOD ? ".on" : ""}`, (0, msg_js_1.default)("DOGESOUNDS_HOLIDAY_PERIOD")), (0, skynode_1.el)(`span.register${period === DogeSoundContestV2Contract_1.default.REGISTER_CANDIDATE_PERIOD ? ".on" : ""}`, (0, msg_js_1.default)("DOGESOUNDS_REGISTER_CANDIDATE_PERIOD")), (0, skynode_1.el)(`span.vote${period === DogeSoundContestV2Contract_1.default.VOTE_PERIOD ? ".on" : ""}`, (0, msg_js_1.default)("DOGESOUNDS_VOTE_PERIOD")));
        const timer = (0, skynode_1.el)("p", (0, msg_js_1.default)("DOGESOUNDS_TIMER").replace(/{block}/, String(remains))).appendTo(this.status);
        this.remainsInterval = setInterval(() => {
            if (remains <= 1) {
                setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                clearInterval(this.remainsInterval);
            }
            else {
                remains -= 1;
                timer.empty().appendText((0, msg_js_1.default)("DOGESOUNDS_TIMER").replace(/{block}/, String(remains)));
            }
        }, 1000);
    }
    changeParams(params, uri) { }
    close() {
        if (this.remainsInterval !== undefined) {
            clearInterval(this.remainsInterval);
        }
        this.container.delete();
    }
}
exports.default = DogeSounds;
//# sourceMappingURL=DogeSounds.js.map