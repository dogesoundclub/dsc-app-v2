"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const MatesListenersContract_1 = __importDefault(require("../../contracts/turntable/MatesListenersContract"));
class MateItem extends skynode_1.DomNode {
    constructor(view, turntableId, id, name) {
        super(".mate-item");
        this.view = view;
        this.turntableId = turntableId;
        this.id = id;
        this.claimable = ethers_1.BigNumber.from(0);
        this.append((0, skynode_1.el)(".content", (0, skynode_1.el)(".mate", { style: { backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)` } }, (0, skynode_1.el)("span.id", `#${id}`), (0, skynode_1.el)("span.name", name)), (0, skynode_1.el)(".info", (0, skynode_1.el)("h5", "쌓인 MIX"), this.mixAmount = (0, skynode_1.el)(".amount", "Loading...")), (0, skynode_1.el)(".controller", (0, skynode_1.el)("a.claim-button", "받기", {
            click: async () => {
                await MatesListenersContract_1.default.claim(this.turntableId, [this.id]);
            },
        }))));
        this.load();
        this.refreshInterval = setInterval(() => this.load(), 1000);
    }
    async load() {
        const claimable = await MatesListenersContract_1.default.claimableOf(this.turntableId, this.id);
        if (this.deleted !== true) {
            this.mixAmount.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(claimable), 5));
            this.view.changeMix(claimable.sub(this.claimable));
            this.claimable = claimable;
        }
    }
    delete() {
        clearInterval(this.refreshInterval);
        super.delete();
    }
}
exports.default = MateItem;
//# sourceMappingURL=MateItem.js.map