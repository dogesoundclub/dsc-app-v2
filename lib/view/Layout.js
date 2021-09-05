"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("main", this.content = (0, skynode_1.el)(".content"))));
    }
    set title(title) {
        document.title = `Doge Sound Club - ${title}`;
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map