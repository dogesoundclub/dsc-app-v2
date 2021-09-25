"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MobileMenu_1 = __importDefault(require("../ui/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../ui/menu/PCMenu"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header", (0, skynode_1.el)("a.menu-button", (0, skynode_1.el)("img", {
            src: "/images/ui/menu-button.png",
            srcset: "/images/ui/menu-button@2x.png 2x",
        }), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 180, top: rect.bottom }).appendTo(skynode_1.BodyNode);
            },
        }), new PCMenu_1.default()), (0, skynode_1.el)("main", this.content = (0, skynode_1.el)(".content")), (0, skynode_1.el)("footer", (0, skynode_1.el)("span", "© 2021 DSLAB"), (0, skynode_1.el)("a", "TERMS & CONDITIONS", {
            click: () => ViewUtil_1.default.go("/terms"),
        }))));
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