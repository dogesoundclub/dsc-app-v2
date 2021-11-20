"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const BuyTurntableItem_1 = __importDefault(require("../../component/turntable/BuyTurntableItem"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class BuyTurntable {
    constructor() {
        Layout_1.default.current.title = "턴테이블 구매";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".buy-turntable-view", (0, skynode_1.el)("h1", "턴테이블 구매"), (0, skynode_1.el)("a.back-button", "< 뒤로가기", {
            click: () => ViewUtil_1.default.go("/turntable"),
        }), (0, skynode_1.el)("p", "턴테이블을 구매합니다. 턴테이블의 볼륨에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."), (0, skynode_1.el)("p", "턴테이블을 구매하시고 리스너를 유치해보세요. 리스너에게 분배되는 MIX 중 30%는 턴테이블 소유자에게 분배됩니다!"), (0, skynode_1.el)("p.warning", "* 배터리 수명이 다 된 턴테이블은 배터리를 충전해야합니다. 배터리 충전 가격은 턴테이블의 가격의 절반과 비례하며, 턴테이블의 가격과 같은 액수의 MIX로 배터리를 충전하면 턴테이블 수명의 2배의 수명이 더해집니다."), (0, skynode_1.el)(".turntable-list", new BuyTurntableItem_1.default(0), new BuyTurntableItem_1.default(1), new BuyTurntableItem_1.default(2), new BuyTurntableItem_1.default(3), new BuyTurntableItem_1.default(4))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = BuyTurntable;
//# sourceMappingURL=BuyTurntable.js.map