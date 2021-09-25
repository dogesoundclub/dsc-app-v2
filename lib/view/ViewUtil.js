"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
class ViewUtil {
    go(uri) {
        skyrouter_1.SkyRouter.go(uri);
        window.scrollTo(0, 0);
    }
}
exports.default = new ViewUtil();
//# sourceMappingURL=ViewUtil.js.map