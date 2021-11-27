"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const MateList_1 = __importDefault(require("../../component/mate/MateList"));
const MateContract_1 = __importDefault(require("../../contracts/nft/MateContract"));
const MatesListenersContract_1 = __importDefault(require("../../contracts/turntable/MatesListenersContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class RemoveMates {
    constructor(params) {
        const turntableId = parseInt(params.id, 10);
        Layout_1.default.current.title = "턴테이블에 메이트 등록 취소";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".add-mates-to-turntable-view", (0, skynode_1.el)("h1", "턴테이블에 메이트 등록 취소하기"), (0, skynode_1.el)("a.back-button", "< 뒤로가기", {
            click: () => ViewUtil_1.default.go(`/turntable/${turntableId}`),
        }), (0, skynode_1.el)("p", "해당 턴테이블에서 더 이상 리스너로 등록되지 않을 메이트를 선택해주시기 바랍니다."), this.selectedMates = (0, skynode_1.el)(".selected-mates", (0, msg_js_1.default)("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(0))), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_MAX_SELECT_BUTTON")}`, {
            click: () => this.mateList.maxSelect(),
        })), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a", `▶ ${(0, msg_js_1.default)("DOGESOUNDS_DESELECT_BUTTON")}`, {
            click: () => this.mateList.deselect(),
        })), this.mateList = new MateList_1.default(true, false), (0, skynode_1.el)("a.submit-button", "메이트 등록 취소", {
            click: async () => {
                await MatesListenersContract_1.default.unlisten(turntableId, this.mateList.selectedMateIds);
                setTimeout(() => ViewUtil_1.default.go(`/turntable/${turntableId}`), 2000);
            },
        })));
        this.load(turntableId);
        this.mateList.on("selectMate", () => {
            this.selectedMates.empty().appendText((0, msg_js_1.default)("DOGESOUNDS_SELECTED_MATES_COUNT").replace(/{count}/, String(this.mateList.selectedMateIds.length)));
        });
    }
    async load(turntableId) {
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const mateBalance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            const mates = [];
            const votedMates = [];
            const promises = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index) => {
                    const mateId = (await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index)).toNumber();
                    mates.push(mateId);
                    if (await MatesListenersContract_1.default.listening(mateId) !== true ||
                        (await MatesListenersContract_1.default.listeningTo(mateId)).toNumber() !== turntableId) {
                        votedMates.push(mateId);
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.mateList.load(mates, votedMates);
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = RemoveMates;
//# sourceMappingURL=RemoveMates%20copy.js.map