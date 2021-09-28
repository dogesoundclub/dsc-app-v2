import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import MintForm from "../../component/dogesounds/MintForm";
import RankList from "../../component/dogesounds/RankList";
import RegisterCandidateForm from "../../component/dogesounds/RegisterCandidateForm";
import VoteForm from "../../component/dogesounds/VoteForm";
import DogeSoundContestV2Contract from "../../contracts/DogeSoundContestV2Contract";
import Layout from "../Layout";

export default class DogeSounds implements View {

    private container: DomNode;
    private periodTriangle: DomNode;
    private status: DomNode;
    private form: DomNode | undefined;

    private remainsInterval: any | undefined;

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
                el("p", msg("DOGESOUNDS_RULE_3")),
                el("a.opensea-link", msg("DOGESOUNDS_OPENSEA_LINK"), { href: "https://opensea.io/collection/dsc-dogesound-winners", target: "_blank" }),
            ),
            el("section",
                el("h2", msg("DOGESOUNDS_WINNERS_TITLE")),
                new RankList(),
            ),
            this.status = el("section.status",
                el("h2", msg("DOGESOUNDS_STATUS_TITLE")),
                this.periodTriangle = el(".period-triangle"),
            ),
        ));
        this.load();
    }

    private async load() {

        const currentRound = (await DogeSoundContestV2Contract.getRound()).toNumber();
        const period = (await DogeSoundContestV2Contract.getPeriod()).toNumber();
        let remains = (await DogeSoundContestV2Contract.getRemains()).toNumber();

        this.form?.delete();

        if (period === DogeSoundContestV2Contract.HOLIDAY_PERIOD) {
            this.periodTriangle.append(el("img", {
                src: "/images/components/dogesounds/period-holiday.png",
                srcset: "/images/components/dogesounds/period-holiday@2x.png 2x",
            }));
            this.status.append(
                el("p", msg("DOGESOUNDS_HOLIDAY_DESCRIPTION").replace(/{round}/, String(currentRound))),
                el("p", msg("DOGESOUNDS_HOLIDAY_DESCRIPTION_2")),
            );
            this.form = new MintForm(currentRound - 1).appendTo(this.container);
        }

        else if (period === DogeSoundContestV2Contract.REGISTER_CANDIDATE_PERIOD) {
            this.periodTriangle.append(el("img", {
                src: "/images/components/dogesounds/period-register.png",
                srcset: "/images/components/dogesounds/period-register@2x.png 2x",
            }));
            this.status.append(el("p", msg("DOGESOUNDS_REGISTER_CANDIDATE_DESCRIPTION").replace(/{round}/, String(currentRound + 1))));
            this.form = new RegisterCandidateForm(currentRound).appendTo(this.container);
        }

        else if (period === DogeSoundContestV2Contract.VOTE_PERIOD) {
            this.periodTriangle.append(el("img", {
                src: "/images/components/dogesounds/period-vote.png",
                srcset: "/images/components/dogesounds/period-vote@2x.png 2x",
            }));
            this.status.append(el("p", msg("DOGESOUNDS_VOTE_DESCRIPTION").replace(/{round}/, String(currentRound + 1))));
            this.form = new VoteForm(currentRound).appendTo(this.container);
        }

        this.periodTriangle.append(
            el(`span.holiday${period === DogeSoundContestV2Contract.HOLIDAY_PERIOD ? ".on" : ""}`, msg("DOGESOUNDS_HOLIDAY_PERIOD")),
            el(`span.register${period === DogeSoundContestV2Contract.REGISTER_CANDIDATE_PERIOD ? ".on" : ""}`, msg("DOGESOUNDS_REGISTER_CANDIDATE_PERIOD")),
            el(`span.vote${period === DogeSoundContestV2Contract.VOTE_PERIOD ? ".on" : ""}`, msg("DOGESOUNDS_VOTE_PERIOD")),
        );

        const timer = el("p", msg("DOGESOUNDS_TIMER").replace(/{block}/, String(remains))).appendTo(this.status);

        this.remainsInterval = setInterval(() => {
            if (remains <= 1) {
                setTimeout(() => SkyRouter.refresh(), 2000);
                clearInterval(this.remainsInterval);
            } else {
                remains -= 1;
                timer.empty().appendText(msg("DOGESOUNDS_TIMER").replace(/{block}/, String(remains)));
            }
        }, 1000);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        if (this.remainsInterval !== undefined) {
            clearInterval(this.remainsInterval);
        }
        this.container.delete();
    }
}
