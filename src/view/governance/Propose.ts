import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import MateList from "../../component/mate/MateList";
import MateContract from "../../contracts/MateContract";
import VoteContract from "../../contracts/VoteContract";
import Wallet from "../../klaytn/Wallet";
import Alert from "../../ui/dialogue/Alert";
import Confirm from "../../ui/dialogue/Confirm";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Propose implements View {

    private container: DomNode;
    private proposer: DomNode;
    private wallet: DomNode;
    private ownedMates: DomNode;
    private selectedMates: DomNode;
    private mateList: MateList;

    constructor() {
        Layout.current.title = msg("GOVERNANCE_TITLE");

        let titleInput: DomNode<HTMLInputElement>;
        let periodInput: DomNode<HTMLInputElement>;
        let summaryInput: DomNode<HTMLTextAreaElement>;
        let contentInput: DomNode<HTMLTextAreaElement>;
        let noteInput: DomNode<HTMLTextAreaElement>;
        let termCheckbox: DomNode<HTMLInputElement>;

        Layout.current.content.append(this.container = el(".governance-propose-view",
            el("h1", msg("GOVERNANCE_TITLE")),
            el("a.back-button", `< ${msg("GOVERNANCE_PROPOSAL_BACK_BUTTON")}`, {
                click: () => ViewUtil.go("/governance"),
            }),
            el(".form",
                el("h2", `- ${msg("GOVERNANCE_PROPOSAL_FORM_TITLE")} -`),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_TITLE"),
                    titleInput = el("input", { placeholder: msg("GOVERNANCE_PROPOSAL_TITLE_PLACEHOLDER") })
                ),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_PERIOD"),
                    periodInput = el("input", { placeholder: msg("GOVERNANCE_PROPOSAL_PERIOD_PLACEHOLDER") })
                ),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_SUMMARY"),
                    summaryInput = el("textarea", { placeholder: msg("GOVERNANCE_PROPOSAL_SUMMARY_PLACEHOLDER") })
                ),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_CONTENT"),
                    el("p", msg("GOVERNANCE_PROPOSAL_CONTENT_DESCRIOPTION")),
                    el("a.markdown-button", msg("GOVERNANCE_PROPOSAL_CONTENT_MARKDOWN_BUTTON"), { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                    contentInput = el("textarea.content", { placeholder: msg("GOVERNANCE_PROPOSAL_CONTENT_PLACEHOLDER") })
                ),
                el("label",
                    msg("GOVERNANCE_PROPOSAL_NOTE"),
                    noteInput = el("textarea"),
                ),
                el(".proposer",
                    el("h5", msg("GOVERNANCE_PROPOSAL_PROPOSER")),
                    this.proposer = el("span"),
                ),
            ),
            this.wallet = el(".wallet"),
            this.ownedMates = el(".owned-mates"),
            this.selectedMates = el(".selected-mates", msg("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(0))),
            el(".button-container", el("a", `▶ ${msg("DOGESOUNDS_MAX_SELECT_BUTTON")}`, {
                click: () => this.mateList.maxSelect(25),
            })),
            el(".button-container", el("a", `▶ ${msg("DOGESOUNDS_DESELECT_BUTTON")}`, {
                click: () => this.mateList.deselect(),
            })),
            this.mateList = new MateList(true, false),
            el("label.terms",
                termCheckbox = el("input", { type: "checkbox" }),
                el("p", msg("GOVERNANCE_PROPOSAL_TERM")),
            ),
            el("a.submit-button", msg("GOVERNANCE_PROPOSE_SUBMIT_BUTTON"), {
                click: () => {
                    if (termCheckbox.domElement.checked === true) {
                        new Confirm(msg("GOVERNANCE_PROPOSE_SUBMIT_CONFIRM"), msg("CONFIRM_BUTTON"), async () => {
                            const owner = await Wallet.loadAddress();
                            if (owner !== undefined) {
                                const proposeMateCount = (await VoteContract.getProposeMateCount()).toNumber();
                                if (this.mateList.selectedMateIds.length !== proposeMateCount) {
                                    new Alert(msg("GOVERNANCE_PROPOSAL_NEED_MORE_MATES_ERROR").replace(/{proposeMateCount}/, String(proposeMateCount)), msg("CONFIRM_BUTTON"));
                                } else {
                                    if (await MateContract.isApprovedForAll(owner, VoteContract.address) !== true) {
                                        await MateContract.setApprovalForAll(VoteContract.address, true);
                                    }
                                    await VoteContract.propose(
                                        titleInput.domElement.value,
                                        summaryInput.domElement.value,
                                        contentInput.domElement.value,
                                        noteInput.domElement.value,
                                        periodInput.domElement.value,
                                        MateContract.address,
                                        this.mateList.selectedMateIds,
                                    );
                                    setTimeout(() => ViewUtil.go("/governance"), 2000);
                                }
                            }
                        });
                    }
                },
            }),
        ));

        this.load();
        Wallet.on("connect", this.connectHandler);

        this.mateList.on("selectMate", () => {
            this.selectedMates.empty().appendText(msg("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(this.mateList.selectedMateIds.length)));
        });
        this.loadMates();
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            this.proposer.empty().appendText(owner);
        }
    }

    private async loadMates() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {

            this.wallet.appendText(`- ${msg("DOGESOUNDS_WALLET_ADDRESS")} : `);
            this.wallet.append(el("a", walletAddress,
                { href: `https://opensea.io/${walletAddress}`, target: "_blank" },
            ));

            const mateBalance = (await MateContract.balanceOf(walletAddress)).toNumber();
            this.ownedMates.appendText(`- ${msg("DOGESOUNDS_OWNED_MATES_COUNT").replace(/{count}/, String(mateBalance))}`);

            const mates: number[] = [];

            const promises: Promise<void>[] = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index: number) => {
                    const mateId = (await MateContract.tokenOfOwnerByIndex(walletAddress, index)).toNumber();
                    mates.push(mateId);
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            this.mateList.load(mates);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        Wallet.off("connect", this.connectHandler);
        this.container.delete();
    }
}
