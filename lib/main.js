"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const BrowserInfo_1 = __importDefault(require("./BrowserInfo"));
const Wallet_1 = __importDefault(require("./klaytn/Wallet"));
const Activities_1 = __importDefault(require("./view/Activities"));
const DogeSounds_1 = __importDefault(require("./view/activities/DogeSounds"));
const Governance_1 = __importDefault(require("./view/Governance"));
const Detail_1 = __importDefault(require("./view/governance/Detail"));
const Propose_1 = __importDefault(require("./view/governance/Propose"));
const Home_1 = __importDefault(require("./view/Home"));
const Layout_1 = __importDefault(require("./view/Layout"));
const Mates_1 = __importDefault(require("./view/Mates"));
const BuyMates_1 = __importDefault(require("./view/mates/BuyMates"));
const FollowMe_1 = __importDefault(require("./view/mates/FollowMe"));
const Gallery_1 = __importDefault(require("./view/mates/Gallery"));
const MateDetail_1 = __importDefault(require("./view/mates/MateDetail"));
const MyMates_1 = __importDefault(require("./view/mates/MyMates"));
const Terms_1 = __importDefault(require("./view/Terms"));
(async () => {
    msg_js_1.default.language = BrowserInfo_1.default.language;
    msg_js_1.default.parseCSV((await superagent_1.default.get("/msg.csv")).text);
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", Home_1.default);
    skyrouter_1.SkyRouter.route("mates", Mates_1.default);
    skyrouter_1.SkyRouter.route("mates/gallery", Gallery_1.default);
    skyrouter_1.SkyRouter.route("mates/followme", FollowMe_1.default);
    skyrouter_1.SkyRouter.route("mates/buy", BuyMates_1.default);
    skyrouter_1.SkyRouter.route("mates/mymates", MyMates_1.default);
    skyrouter_1.SkyRouter.route("mates/{id}", MateDetail_1.default, [
        "mates/gallery",
        "mates/rarity",
        "mates/followme",
        "mates/buy",
        "mates/mymates",
    ]);
    skyrouter_1.SkyRouter.route("activities", Activities_1.default);
    skyrouter_1.SkyRouter.route("dogesounds", DogeSounds_1.default);
    skyrouter_1.SkyRouter.route("governance", Governance_1.default);
    skyrouter_1.SkyRouter.route("governance/propose", Propose_1.default);
    skyrouter_1.SkyRouter.route("governance/{id}", Detail_1.default, ["governance/propose"]);
    skyrouter_1.SkyRouter.route("terms", Terms_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    if (await Wallet_1.default.connected() !== true) {
        await Wallet_1.default.connect();
    }
})();
//# sourceMappingURL=main.js.map