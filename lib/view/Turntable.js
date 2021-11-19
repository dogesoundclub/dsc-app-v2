"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Turntable {
    constructor() {
        Layout_1.default.current.title = "턴테이블";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".turntable-view", (0, skynode_1.el)("h1", "턴테이블"), (0, skynode_1.el)("p", "턴테이블은 MIX를 중~장기로 스테이킹하고자 하는 사용자들을 위한 시스템입니다. 턴테이블의 볼륨에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "나의 턴테이블")), (0, skynode_1.el)("a", "턴테이블 구매하기", { click: () => ViewUtil_1.default.go("/turntable/buy") }), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "리스닝중인 턴테이블"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Turntable;
//# sourceMappingURL=Turntable.js.map