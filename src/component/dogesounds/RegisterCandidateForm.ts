import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import DogeSoundContestV2Contract from "../../contracts/DogeSoundContestV2Contract";
import MateContract from "../../contracts/MateContract";
import Wallet from "../../klaytn/Wallet";
import MateList from "../mate/MateList";
import CandidateList from "./CandidateList";

export default class RegisterCandidateForm extends DomNode {

    private wallet: DomNode;
    private ownedMates: DomNode;
    private registableMates: DomNode;
    private selectedMates: DomNode;
    private mateList: MateList;

    constructor(private round: number) {
        super(".register-candidate-form");
        this.append(

            this.wallet = el(".wallet"),
            this.ownedMates = el(".owned-mates"),
            this.registableMates = el(".registable-mates"),
            el(".info", msg("DOGESOUNDS_VOTE_WARNING")),

            this.selectedMates = el(".selected-mates"),
            el("", el("a", `▶ ${msg("DOGESOUNDS_MAX_SELECT_BUTTON")}`, {

            })),
            el("", el("a", `▶ ${msg("DOGESOUNDS_DESELECT_BUTTON")}`, {

            })),
            this.mateList = new MateList(true),
            el("a.submit-button", msg("DOGESOUNDS_REGISTER_SUBMIT"), {

            }),

            new CandidateList(round),
        );
        this.mateList.on("selectMate", () => {
            console.log(this.mateList.selectedMaidIds);
        });
        this.loadMates();
    }

    private async loadMates() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {

            this.wallet.appendText(`- ${msg("DOGESOUNDS_WALLET_ADDRESS")} : `);
            this.wallet.append(el("a", walletAddress,
                { href: `https://opensea.io/${walletAddress}` }
            ));

            const mateBalance = (await MateContract.balanceOf(walletAddress)).toNumber();
            const votedMateCount = (await DogeSoundContestV2Contract.getUserVotes(this.round, walletAddress)).toNumber();
            const candidateMateCount = (await DogeSoundContestV2Contract.getCandidateMateCount()).toNumber();

            this.ownedMates.appendText(`- ${msg("DOGESOUNDS_OWNED_MATES_COUNT").replace(/{count}/, String(mateBalance))}`);
            this.registableMates.appendText(`- ${msg("DOGESOUNDS_REGISTABLE_MATES_COUNT").replace(/{count}/, String(mateBalance - votedMateCount)).replace(/{candidateCount}/, String(candidateMateCount))}`);

            const mates: number[] = [];
            const promises: Promise<void>[] = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index: number) => {
                    const mateId = await MateContract.tokenOfOwnerByIndex(walletAddress, index);
                    mates.push(mateId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            this.mateList.draw(mates);
        }
    }
}
