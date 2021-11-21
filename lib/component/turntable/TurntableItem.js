"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const TurntableExtrasContract_1 = __importDefault(require("../../contracts/turntable/TurntableExtrasContract"));
const TurntablesContract_1 = __importDefault(require("../../contracts/turntable/TurntablesContract"));
const turntables_json_1 = __importDefault(require("../../turntables.json"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class TurntableItem extends skynode_1.DomNode {
    constructor(id, currentBlock, info, showMix) {
        super(".turntable-item");
        this.id = id;
        const lifetime = info.endBlock - currentBlock;
        this.append(this.nameDisplay = (0, skynode_1.el)("h4", `턴테이블 #${id}`, { style: { color: turntables_json_1.default[info.typeId].color } }), (0, skynode_1.el)("img", { src: turntables_json_1.default[info.typeId].img }), (0, skynode_1.el)(".owner", `소유자: ${CommonUtil_1.default.shortenAddress(info.owner)}`), showMix !== true ? undefined : this.claimableDisplay = (0, skynode_1.el)(".mix", "Loading..."), (0, skynode_1.el)(".lifetime", `Lifetime: ${CommonUtil_1.default.numberWithCommas(String(lifetime < 0 ? 0 : lifetime))} Blocks`));
        if (showMix === true) {
            this.loadClaimable();
        }
        this.onDom("click", () => ViewUtil_1.default.go(`/turntable/${id}`));
        this.loadInfo();
    }
    async loadInfo() {
        const extra = await TurntableExtrasContract_1.default.extras(this.id);
        let data = {};
        try {
            data = JSON.parse(extra);
        }
        catch (e) {
            console.error(e);
        }
        if (data.name !== undefined) {
            this.nameDisplay.empty().appendText(data.name);
        }
    }
    async loadClaimable() {
        const claimable = await TurntablesContract_1.default.claimableOf(this.id);
        this.claimableDisplay?.empty().appendText(`쌓인 MIX: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(claimable), 5)}`);
    }
}
exports.default = TurntableItem;
//# sourceMappingURL=TurntableItem.js.map