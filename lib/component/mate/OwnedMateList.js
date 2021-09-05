"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MateLine_1 = __importDefault(require("./MateLine"));
class MateList extends skynode_1.ScrollableDomNode {
    constructor() {
        super(document.createElement("div"), { childTag: "div", baseChildHeight: 90 }, (data) => new MateLine_1.default(data));
    }
}
exports.default = MateList;
//# sourceMappingURL=OwnedMateList.js.map