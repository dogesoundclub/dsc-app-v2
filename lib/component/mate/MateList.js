"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const MateLine_1 = __importDefault(require("./MateLine"));
class MateList extends skynode_1.ScrollableDomNode {
    constructor(selectable = false) {
        super((() => {
            const dom = document.createElement("div");
            dom.className = "mate-list";
            return dom;
        })(), { childTag: "div", baseChildHeight: window.innerWidth < 800 ? 64 : 90 }, (ids) => new MateLine_1.default(this, ids, selectable));
        this.selectedMaidIds = [];
    }
    draw(mates) {
        let index = 0;
        const mateData = [];
        skyutil_1.default.repeat(window.innerWidth < 800 ? Math.ceil(mates.length / 5) : Math.ceil(mates.length / 8), () => {
            const ids = [];
            skyutil_1.default.repeat(window.innerWidth < 800 ? 5 : 8, () => {
                ids.push(mates[index]);
                index += 1;
                if (index === mates.length) {
                    return false;
                }
            });
            mateData.push(ids);
            if (index === mates.length) {
                return false;
            }
        });
        this.init(mateData);
        this.calculateSize();
    }
}
exports.default = MateList;
//# sourceMappingURL=MateList.js.map