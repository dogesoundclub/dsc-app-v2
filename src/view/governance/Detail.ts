import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import xss from "xss";
import Loading from "../../component/loading/Loading";
import MateList from "../../component/mate/MateList";
import VoteContract from "../../contracts/governance/VoteContract";
import MateContract from "../../contracts/nft/MateContract";
import Klaytn from "../../klaytn/Klaytn";
import Wallet from "../../klaytn/Wallet";
import Confirm from "../../ui/dialogue/Confirm";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Detail implements View {

    private proposalId: number | undefined;

    private container: DomNode;
    private content: DomNode;
    private voteForm: DomNode;
    private loading: Loading | undefined;
    private timerInterval: any | undefined;

    private wallet: DomNode;
    private ownedMates: DomNode;
    private votableMates: DomNode;
    private selectedMates: DomNode;
    private mateList: MateList;

    constructor(params: ViewParams) {
        Layout.current.title = msg("GOVERNANCE_TITLE");

        let forRadio: DomNode<HTMLInputElement>;
        let againstRadio: DomNode<HTMLInputElement>;
        Layout.current.content.append(this.container = el(".governance-detail-view",

            el("h1", msg("GOVERNANCE_TITLE")),
            el("a.back-button", `< ${msg("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
                click: () => ViewUtil.go("/governance"),
            }),

            this.content = el(".content",
                this.loading = new Loading(),
            ),

            this.voteForm = el(".vote-form",
                this.wallet = el(".wallet"),
                this.ownedMates = el(".owned-mates"),
                this.votableMates = el(".votable-mates"),
                this.selectedMates = el(".selected-mates", msg("GOVERNANCE_SELECTED_MATES_COUNT").replace(/{count}/, String(0))),
                el(".button-container", el("a", `▶ ${msg("GOVERNANCE_MAX_SELECT_BUTTON")}`, {
                    click: () => this.mateList.maxSelect(30),
                })),
                el(".button-container", el("a", `▶ ${msg("GOVERNANCE_DESELECT_BUTTON")}`, {
                    click: () => this.mateList.deselect(),
                })),
                this.mateList = new MateList(true, false),
                el(".select",
                    el("label.for", el("span.title", msg("GOVERNANCE_PROPOSAL_VOTE_FOR")), forRadio = el("input", {
                        name: "governance-radio",
                        type: "radio",
                    })),
                    el("label.against", el("span.title", msg("GOVERNANCE_PROPOSAL_VOTE_AGAINST")), againstRadio = el("input", {
                        name: "governance-radio",
                        type: "radio",
                    })),
                ),
                el("a.vote-button", msg("GOVERNANCE_PROPOSAL_VOTE_BUTTON"), {
                    click: async () => {
                        if (this.proposalId !== undefined) {
                            if (forRadio.domElement.checked === true) {
                                await VoteContract.voteFor(this.proposalId, MateContract.address, this.mateList.selectedMateIds);
                                ViewUtil.waitTransactionAndRefresh();
                            }
                            if (againstRadio.domElement.checked === true) {
                                await VoteContract.voteAgainst(this.proposalId, MateContract.address, this.mateList.selectedMateIds);
                                ViewUtil.waitTransactionAndRefresh();
                            }
                        }
                    },
                }),
            ),
        ));

        this.load(params.id);
        this.mateList.on("selectMate", () => {
            this.selectedMates.empty().appendText(msg("GOVERNANCE_SELECTED_MATES_COUNT").replace(/{count}/, String(this.mateList.selectedMateIds.length)));
        });
    }

    private async load(id: string) {
        this.proposalId = parseInt(id, 10);

        const proposal = await VoteContract.getProposal(id);

        const title = el("h1", el("span", `DIP-${this.proposalId}: ${proposal.title}`)).appendTo(this.content);

        if (proposal.executed === true) {
            title.append(el(".result.executed", `- ${msg("GOVERNANCE_PROPOSAL_EXECUTED")} -`));
        } else {
            const result = await VoteContract.getResult(id);
            if (result === VoteContract.VOTING) {
                title.append(el(".result.voting", `- ${msg("GOVERNANCE_PROPOSAL_VOTING")} -`));
            } else if (result === VoteContract.CANCELED) {
                title.append(el(".result.canceled", `- ${msg("GOVERNANCE_PROPOSAL_CANCELED")} -`));
            } else if (result === VoteContract.RESULT_SAME) {
                title.append(el(".result.same", `- ${msg("GOVERNANCE_PROPOSAL_RESULT_SAME")} -`));
            } else if (result === VoteContract.RESULT_FOR) {
                title.append(el(".result.for", `- ${msg("GOVERNANCE_PROPOSAL_RESULT_FOR")} -`));
            } else if (result === VoteContract.RESULT_AGAINST) {
                title.append(el(".result.against", `- ${msg("GOVERNANCE_PROPOSAL_RESULT_AGAINST")} -`));
            }
        }

        const currentBlock = await Klaytn.loadBlockNumber();
        let remains = proposal.votePeriod - (currentBlock - proposal.blockNumber);
        if (remains < 0) {
            remains = 0;
        }

        const timer = el(".timer", msg("GOVERNANCE_PROPOSAL_REMAIN_BLOCKS").replace(/{block}/, String(proposal.votePeriod - (currentBlock - proposal.blockNumber)))).appendTo(this.content);
        timer.empty().appendText(msg("GOVERNANCE_PROPOSAL_REMAIN_BLOCKS").replace(/{block}/, String(remains)));

        if (remains > 0) {
            this.timerInterval = setInterval(async () => {

                const currentBlock = await Klaytn.loadBlockNumber();
                const remains = proposal.votePeriod - (currentBlock - proposal.blockNumber);

                if (remains <= 1) {
                    ViewUtil.waitTransactionAndRefresh();
                    clearInterval(this.timerInterval);
                } else {
                    timer.empty().appendText(msg("GOVERNANCE_PROPOSAL_REMAIN_BLOCKS").replace(/{block}/, String(remains)));
                }
            }, 1000);
        }

        const voteCounts = el(".vote-counts").appendTo(this.content);
        voteCounts.append(el(".for-votes",
            el("span.title", msg("GOVERNANCE_PROPOSAL_VOTE_FOR")),
            el("span.count", String(await VoteContract.getForVotes(id))),
        ));
        voteCounts.append(el(".against-votes",
            el("span.title", msg("GOVERNANCE_PROPOSAL_VOTE_AGAINST")),
            el("span.count", String(await VoteContract.getAgainstVotes(id))),
        ));

        let content;
        this.content.append(
            el("h2", msg("GOVERNANCE_PROPOSAL_SUMMARY")),
            el("p", proposal.summary),
            el("h2", msg("GOVERNANCE_PROPOSAL_CONTENT")),
            content = el(".content.markdown-body"),
            el("h2", msg("GOVERNANCE_PROPOSAL_NOTE")),
            el("p", proposal.note),
            el("h2", msg("GOVERNANCE_PROPOSAL_PROPOSER")),
            el("p", proposal.proposer),
        );

        content.domElement.innerHTML = this.proposalId === 2 ? proposal.content.replace(/\n/g, "<br>") : xss(marked(proposal.content));

        if (remains > 0) {
            const walletAddress = await Wallet.loadAddress();
            if (walletAddress !== undefined) {

                if (walletAddress === proposal.proposer) {
                    this.content.append(
                        el("a.cancel-button", msg("GOVERNANCE_CANCEL_PROPOSAL_BUTTON"), {
                            click: async () => {
                                new Confirm(msg("GOVERNANCE_CANCEL_PROPOSAL_WARNING"), msg("GOVERNANCE_CANCEL_PROPOSAL_BUTTON"), async () => {
                                    if (this.proposalId !== undefined) {
                                        await VoteContract.cancel(this.proposalId);
                                        ViewUtil.waitTransactionAndRefresh();
                                    }
                                });
                            },
                        }),
                    );
                }

                this.wallet.appendText(`- ${msg("GOVERNANCE_WALLET_ADDRESS")} : `);
                this.wallet.append(el("a", walletAddress,
                    { href: `https://opensea.io/${walletAddress}`, target: "_blank" },
                ));

                const mateBalance = (await MateContract.balanceOf(walletAddress)).toNumber();

                this.ownedMates.appendText(`- ${msg("GOVERNANCE_OWNED_MATES_COUNT").replace(/{count}/, String(mateBalance))}`);

                const mates: number[] = [];
                const votedMates: number[] = [];

                const promises: Promise<void>[] = [];
                for (let i = 0; i < mateBalance; i += 1) {
                    const promise = async (index: number) => {
                        const mateId = (await MateContract.tokenOfOwnerByIndex(walletAddress, index)).toNumber();
                        mates.push(mateId);
                        if (await VoteContract.getMateVoted(id, MateContract.address, mateId) === true) {
                            votedMates.push(mateId);
                        }
                    };
                    promises.push(promise(i));
                }
                await Promise.all(promises);

                this.votableMates.appendText(`- ${msg("GOVERNANCE_VOTABLE_MATES_COUNT").replace(/{count}/, String(mateBalance - votedMates.length))}`);
                this.mateList.load(mates, votedMates);

            } else {
                this.voteForm.style({ display: "none" });
            }
        } else {
            this.voteForm.style({ display: "none" });

            const walletAddress = await Wallet.loadAddress();
            if (walletAddress === proposal.proposer && await VoteContract.matesBacked(this.proposalId) !== true) {
                this.container.append(
                    el("a.get-back-mates-button", msg("GOVERNANCE_GET_BACK_MATES_BUTTON"), {
                        click: async () => {
                            if (this.proposalId !== undefined) {
                                await VoteContract.getBackMates(this.proposalId);
                                ViewUtil.waitTransactionAndRefresh();
                            }
                        },
                    }),
                );
            }
        }

        this.loading?.delete();
        this.loading = undefined;
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.id);
    }

    public close(): void {
        if (this.timerInterval !== undefined) {
            clearInterval(this.timerInterval);
        }
        this.container.delete();
    }
}
