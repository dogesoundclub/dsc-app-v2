"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const DogeSoundContestV2Contract_1 = __importDefault(require("../../contracts/DogeSoundContestV2Contract"));
const MateContract_1 = __importDefault(require("../../contracts/MateContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const MateList_1 = __importDefault(require("../mate/MateList"));
const CandidateList_1 = __importDefault(require("./CandidateList"));
class RegisterCandidateForm extends skynode_1.DomNode {
    constructor(round) {
        super(".register-candidate-form");
        this.round = round;
        this.append(this.wallet = (0, skynode_1.el)(".wallet"), this.ownedMates = (0, skynode_1.el)(".owned-mates"), this.registableMates = (0, skynode_1.el)(".registable-mates"), (0, skynode_1.el)(".info", (0, msg_js_1.default)("DOGESOUNDS_VOTE_WARNING")), this.selectedMates = (0, skynode_1.el)(".selected-mates"), (0, skynode_1.el)("", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_MAX_SELECT_BUTTON")}`, {})), (0, skynode_1.el)("", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_DESELECT_BUTTON")}`, {})), this.mateList = new MateList_1.default(true), (0, skynode_1.el)("a.submit-button", (0, msg_js_1.default)("DOGESOUNDS_REGISTER_SUBMIT"), {}), new CandidateList_1.default(round));
        this.mateList.on("selectMate", () => {
            console.log(this.mateList.selectedMaidIds);
        });
        this.loadMates();
    }
    async loadMates() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            this.wallet.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_WALLET_ADDRESS")} : `);
            this.wallet.append((0, skynode_1.el)("a", walletAddress, { href: `https://opensea.io/${walletAddress}` }));
            const mateBalance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            const votedMateCount = (await DogeSoundContestV2Contract_1.default.getUserVotes(this.round, walletAddress)).toNumber();
            const candidateMateCount = (await DogeSoundContestV2Contract_1.default.getCandidateMateCount()).toNumber();
            this.ownedMates.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_OWNED_MATES_COUNT").replace(/{count}/, String(mateBalance))}`);
            this.registableMates.appendText(`- ${(0, msg_js_1.default)("DOGESOUNDS_REGISTABLE_MATES_COUNT").replace(/{count}/, String(mateBalance - votedMateCount)).replace(/{candidateCount}/, String(candidateMateCount))}`);
            const mates = [];
            const promises = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index) => {
                    const mateId = await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index);
                    mates.push(mateId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.mateList.draw(mates);
        }
    }
}
exports.default = RegisterCandidateForm;
//# sourceMappingURL=RegisterCandidateForm.js.map