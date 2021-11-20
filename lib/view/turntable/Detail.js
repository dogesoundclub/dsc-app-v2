"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MateList_1 = __importDefault(require("../../component/mate/MateList"));
const TurntablesContract_1 = __importDefault(require("../../contracts/turntable/TurntablesContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Detail {
    constructor(params) {
        const turntableId = parseInt(params.id, 10);
        Layout_1.default.current.title = "턴테이블";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".turntable-detail-view", this.title = (0, skynode_1.el)("h1", "턴테이블"), (0, skynode_1.el)("a.back-button", "< 뒤로가기", {
            click: () => ViewUtil_1.default.go("/turntable"),
        }), this.infoDisplay = (0, skynode_1.el)(".info"), this.controller = (0, skynode_1.el)(".controller"), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "리스닝 메이트"), this.listeningMateList = new MateList_1.default(true, false)), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "내 메이트 추가"), this.myMateList = new MateList_1.default(true, false)), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "리스닝 LP Token"), (0, skynode_1.el)(".listening-lp", (0, skynode_1.el)("h3", "Klay-MIX Listeners"), this.klayMixInfo = (0, skynode_1.el)(".info")), (0, skynode_1.el)(".listening-lp", (0, skynode_1.el)("h3", "KSP-MIX Listeners"), this.kspMixInfo = (0, skynode_1.el)(".info")))));
        this.load(turntableId);
    }
    async load(turntableId) {
        const turntable = await TurntablesContract_1.default.turntables(turntableId);
        const walletAddress = await Wallet_1.default.loadAddress();
        if (turntable.owner === walletAddress) {
            this.controller.empty().append((0, skynode_1.el)("a.charge-button", "충전하기"), (0, skynode_1.el)("a.update-button", "수정하기", { click: () => ViewUtil_1.default.go(`/turntable/${turntableId}/update`) }));
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map