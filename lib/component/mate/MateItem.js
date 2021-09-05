"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const NameContract_1 = __importDefault(require("../../contracts/NameContract"));
class MateItem extends skynode_1.DomNode {
    constructor(id, selectable) {
        super("a.mate-item");
        this.id = id;
        this.style({
            backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)`,
        });
        this.append((0, skynode_1.el)("span.id", `#${id}`), this.nameDisplay = (0, skynode_1.el)("span.name"));
        this.onDom("click", () => {
            skyrouter_1.SkyRouter.go(`/mates/${id}`);
            window.scrollTo(0, 0);
        });
        this.loadName();
    }
    async loadName() {
        this.nameDisplay.appendText(await NameContract_1.default.getName(this.id));
    }
}
exports.default = MateItem;
//# sourceMappingURL=MateItem.js.map