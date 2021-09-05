"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
class MenuTreeBuilder {
    build(menus) {
        const lis = [];
        for (const menuItem of menus) {
            const li = (0, skynode_1.el)("li", (0, skynode_1.el)(`a${location.pathname === `/${menuItem.uri}` ? ".on" : ""}`, (0, msg_js_1.default)(menuItem.name), {
                click: () => {
                    skyrouter_1.SkyRouter.go(`/${menuItem.uri}`);
                    window.scrollTo(0, 0);
                },
            }));
            if (menuItem.children !== undefined) {
                li.append(this.build(menuItem.children));
            }
            lis.push(li);
        }
        return (0, skynode_1.el)("ul", ...lis);
    }
}
exports.default = new MenuTreeBuilder();
//# sourceMappingURL=MenuTreeBuilder.js.map