"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const MateContract_1 = __importDefault(require("../../contracts/nft/MateContract"));
const MatesListenersContract_1 = __importDefault(require("../../contracts/turntable/MatesListenersContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class MateHolders {
    constructor(params) {
        const turntableId = parseInt(params.id, 10);
        Layout_1.default.current.title = "턴테이블의 메이트 홀더들";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".turntable-mate-holders-view", (0, skynode_1.el)("h1", "턴테이블의 메이트 홀더들"), (0, skynode_1.el)("a.back-button", "< 뒤로가기", {
            click: () => ViewUtil_1.default.go(`/turntable/${turntableId}`),
        }), (0, skynode_1.el)("table", (0, skynode_1.el)("thead", (0, skynode_1.el)("tr", (0, skynode_1.el)("th", "홀더 주소"), (0, skynode_1.el)("th", "리스너로 등록한 메이트 개수"))), this.list = (0, skynode_1.el)("tbody.mate-list", new Loading_1.default()))));
        this.load(turntableId);
    }
    async load(turntableId) {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const mateBalance = (await MatesListenersContract_1.default.listenerCount(turntableId)).toNumber();
            const holders = {};
            const promises = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index) => {
                    const mateId = (await MatesListenersContract_1.default.listeners(turntableId, index)).toNumber();
                    const owner = await MateContract_1.default.ownerOf(mateId);
                    if (holders[owner] === undefined) {
                        holders[owner] = 1;
                    }
                    else {
                        holders[owner] += 1;
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.list.empty();
            const entries = Object.entries(holders);
            entries.sort((a, b) => b[1] - a[1]);
            for (const [holder, mates] of entries) {
                this.list.append((0, skynode_1.el)("tr.holder-item", (0, skynode_1.el)("td.holder", holder), (0, skynode_1.el)("td.mates", String(mates))));
            }
        }
        else {
            this.list.empty();
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MateHolders;
//# sourceMappingURL=MateHolders.js.map