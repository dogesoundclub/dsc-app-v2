"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const skyutil_1 = __importDefault(require("skyutil"));
const superagent_1 = __importDefault(require("superagent"));
class MateItem extends skynode_1.DomNode {
    constructor(list, id, selectable) {
        super(`a.mate-item${list.votedMates.includes(id) === true ? ".off" : ""}`);
        this.id = id;
        this.style({
            backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)`,
        });
        this.append((0, skynode_1.el)("span.id", `#${id}`));
        if (selectable === true) {
            if (list.votedMates.includes(id) !== true) {
                this.checkbox = (0, skynode_1.el)("input", {
                    type: "checkbox",
                    click: (event) => event.stopPropagation(),
                    change: () => {
                        if (this.checkbox !== undefined) {
                            if (this.checkbox.domElement.checked === true) {
                                if (list.selectedMateIds.includes(id) !== true) {
                                    list.selectedMateIds.push(id);
                                }
                            }
                            else {
                                skyutil_1.default.pull(list.selectedMateIds, id);
                            }
                            list.fireEvent("selectMate");
                        }
                    }
                }).appendTo(this);
                this.checkbox.domElement.checked = list.selectedMateIds.includes(id);
            }
        }
        else {
            this.nameDisplay = (0, skynode_1.el)("span.name").appendTo(this);
            this.loadName();
        }
        this.onDom("click", () => {
            if (selectable === true) {
                if (this.checkbox !== undefined) {
                    this.checkbox.domElement.checked = this.checkbox.domElement.checked !== true;
                    if (this.checkbox.domElement.checked === true) {
                        if (list.selectedMateIds.includes(id) !== true) {
                            list.selectedMateIds.push(id);
                        }
                    }
                    else {
                        skyutil_1.default.pull(list.selectedMateIds, id);
                    }
                    list.fireEvent("selectMate");
                }
            }
            else {
                skyrouter_1.SkyRouter.go(`/mates/${id}`);
                window.scrollTo(0, 0);
            }
        });
    }
    async loadName() {
        let result = await superagent_1.default.get(`https://api.dogesound.club/mate/cached/${this.id}`);
        let tokenInfo = result.body;
        if (tokenInfo.cached !== true) {
            result = await superagent_1.default.get(`https://api.dogesound.club/mate/${this.id}`);
            tokenInfo = result.body;
        }
        if (tokenInfo.real_name !== undefined) {
            this.nameDisplay?.appendText(tokenInfo.real_name);
        }
    }
}
exports.default = MateItem;
//# sourceMappingURL=MateItem.js.map