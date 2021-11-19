"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const TurntablesContract_1 = __importDefault(require("../../contracts/mix/TurntablesContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class BuyTurntable {
    constructor() {
        Layout_1.default.current.title = "턴테이블 구매";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".buy-turntable-view", (0, skynode_1.el)("h1", "턴테이블 구매"), (0, skynode_1.el)("a.back-button", "< 뒤로가기", {
            click: () => ViewUtil_1.default.go("/turntable"),
        }), (0, skynode_1.el)("p", "턴테이블을 구매합니다. 턴테이블의 볼륨에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."), (0, skynode_1.el)(".turntable-list", (0, skynode_1.el)("a.turntable", (0, skynode_1.el)("h4", "Normal Grade", { style: { color: "#d6d6d6" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/normal.png" }), (0, skynode_1.el)(".volume", "Volume: 1,000"), (0, skynode_1.el)(".price", "Price: 1,000 MIX"), (0, skynode_1.el)(".lifetime", "Lifetime: 2,592,000 Blocks"), (0, skynode_1.el)("a", "구매하기", {
            click: async () => {
                await TurntablesContract_1.default.buy(0);
                setTimeout(() => ViewUtil_1.default.go("/turntable"), 2000);
            },
        })), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Fine Grade", { style: { color: "#6cb2e3" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/fine.png" }), (0, skynode_1.el)(".volume", "Volume: 3,300"), (0, skynode_1.el)(".price", "Price: 3,000 MIX"), (0, skynode_1.el)(".lifetime", "Lifetime: 2,592,000 Blocks"), (0, skynode_1.el)("a", "구매하기", {
            click: async () => {
                await TurntablesContract_1.default.buy(1);
                setTimeout(() => ViewUtil_1.default.go("/turntable"), 2000);
            },
        })), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Rare Grade", { style: { color: "#dbcf74" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/rare.png" }), (0, skynode_1.el)(".volume", "Volume: 5,500"), (0, skynode_1.el)(".price", "Price: 5,000 MIX"), (0, skynode_1.el)(".lifetime", "Lifetime: 2,592,000 Blocks"), (0, skynode_1.el)("a", "구매하기", {
            click: async () => {
                await TurntablesContract_1.default.buy(2);
                setTimeout(() => ViewUtil_1.default.go("/turntable"), 2000);
            },
        })), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Epic Grade", { style: { color: "#f5a360" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/epic.png" }), (0, skynode_1.el)(".volume", "Volume: 8,000"), (0, skynode_1.el)(".price", "Price: 7,000 MIX"), (0, skynode_1.el)(".lifetime", "Lifetime: 2,592,000 Blocks"), (0, skynode_1.el)("a", "구매하기", {
            click: async () => {
                await TurntablesContract_1.default.buy(3);
                setTimeout(() => ViewUtil_1.default.go("/turntable"), 2000);
            },
        })), (0, skynode_1.el)(".turntable", (0, skynode_1.el)("h4", "Supremacy Grade", { style: { color: "#e6500e" } }), (0, skynode_1.el)("img", { src: "/images/components/turntables/supremacy.png" }), (0, skynode_1.el)(".volume", "Volume: 12,000"), (0, skynode_1.el)(".price", "Price: 10,000 MIX"), (0, skynode_1.el)(".lifetime", "Lifetime: 2,592,000 Blocks"), (0, skynode_1.el)("a", "구매하기", {
            click: async () => {
                await TurntablesContract_1.default.buy(4);
                setTimeout(() => ViewUtil_1.default.go("/turntable"), 2000);
            },
        })))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = BuyTurntable;
//# sourceMappingURL=BuyTurntable.js.map