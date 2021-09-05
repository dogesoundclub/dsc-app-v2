"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MateLine_1 = __importDefault(require("./MateLine"));
class MateList extends skynode_1.ScrollableDomNode {
    constructor(selectable = false) {
        super((() => {
            const dom = document.createElement("div");
            dom.className = "mate-list";
            return dom;
        })(), { childTag: "div", baseChildHeight: window.innerWidth < 800 ? 64 : 90 }, (ids) => new MateLine_1.default(ids, selectable));
    }
}
exports.default = MateList;
//# sourceMappingURL=MateList.js.map