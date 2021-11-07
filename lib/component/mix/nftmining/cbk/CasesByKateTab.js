"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../../../CommonUtil"));
const CasesByKatePoolContract_1 = __importDefault(require("../../../../contracts/mix/CasesByKatePoolContract"));
const MixContract_1 = __importDefault(require("../../../../contracts/mix/MixContract"));
const CasesByKateContract_1 = __importDefault(require("../../../../contracts/nft/CasesByKateContract"));
const Wallet_1 = __importDefault(require("../../../../klaytn/Wallet"));
const Confirm_1 = __importDefault(require("../../../../ui/dialogue/Confirm"));
const Loading_1 = __importDefault(require("../../../loading/Loading"));
const CaseItem_1 = __importDefault(require("./CaseItem"));
class CasesByKateTab extends skynode_1.DomNode {
    constructor() {
        super(".cases-by-kate-tab");
        this.cases = [];
        this.totalMix = bignumber_1.BigNumber.from(0);
        this.append((0, skynode_1.el)("header", (0, skynode_1.el)(".total-mix", (0, skynode_1.el)("h4", "쌓인 총 MIX"), this.totalMixDisplay = (0, skynode_1.el)("span", "Loading...")), (0, skynode_1.el)("a.take-all-button", "한꺼번에 받기", {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const balance = await MixContract_1.default.balanceOf(owner);
                    const fee = this.totalMix.div(9);
                    if (balance.lt(fee)) {
                        new Confirm_1.default("NFT로부터 MIX를 수령받기 위해서는 수령받을 MIX의 10%의 MIX를 선납해야 합니다.", "믹스 구매", () => {
                            open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                        });
                    }
                    else {
                        if ((await MixContract_1.default.allowance(owner, CasesByKatePoolContract_1.default.address)).lt(fee)) {
                            await MixContract_1.default.approve(CasesByKatePoolContract_1.default.address, fee);
                            setTimeout(async () => {
                                await CasesByKatePoolContract_1.default.claim(this.cases);
                            }, 2000);
                        }
                        else {
                            await CasesByKatePoolContract_1.default.claim(this.cases);
                        }
                    }
                }
            },
        })), this.list = (0, skynode_1.el)(".case-list", new Loading_1.default()));
        this.load();
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const balance = (await CasesByKateContract_1.default.balanceOf(walletAddress)).toNumber();
            const promises = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index) => {
                    const caseId = await CasesByKateContract_1.default.tokenOfOwnerByIndex(walletAddress, index);
                    this.cases.push(caseId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.list.empty();
            for (const caseId of this.cases) {
                new CaseItem_1.default(this, caseId).appendTo(this.list);
            }
        }
        else {
            this.list.empty();
        }
    }
    changeMix(mix) {
        this.totalMix = this.totalMix.add(mix);
        this.totalMixDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(this.totalMix), 5));
    }
}
exports.default = CasesByKateTab;
//# sourceMappingURL=CasesByKateTab.js.map