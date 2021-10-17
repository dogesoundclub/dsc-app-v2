"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class OGsTab extends skynode_1.DomNode {
    constructor() {
        super(".mates-tab");
        this.append((0, skynode_1.el)("p", "OGs는 추후 공개됩니다!"));
    }
}
exports.default = OGsTab;
//# sourceMappingURL=OGsTab.js.map