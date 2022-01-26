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
const CheckHolder_1 = __importDefault(require("./view/CheckHolder"));
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
const Rarity_1 = __importDefault(require("./view/mates/Rarity"));
const Mix_1 = __importDefault(require("./view/Mix"));
const Booth_1 = __importDefault(require("./view/mix/Booth"));
const BurnPool_1 = __importDefault(require("./view/mix/BurnPool"));
const BuyMix_1 = __importDefault(require("./view/mix/BuyMix"));
const DevFund_1 = __importDefault(require("./view/mix/DevFund"));
const Terms_1 = __importDefault(require("./view/Terms"));
const Turntable_1 = __importDefault(require("./view/Turntable"));
const AddMates_1 = __importDefault(require("./view/turntable/AddMates"));
const BuyTurntable_1 = __importDefault(require("./view/turntable/BuyTurntable"));
const Detail_2 = __importDefault(require("./view/turntable/Detail"));
const MateHolders_1 = __importDefault(require("./view/turntable/MateHolders"));
const MiningMates_1 = __importDefault(require("./view/turntable/MiningMates"));
const RemoveMates_1 = __importDefault(require("./view/turntable/RemoveMates"));
const Update_1 = __importDefault(require("./view/turntable/Update"));
(async () => {
    msg_js_1.default.language = BrowserInfo_1.default.language;
    msg_js_1.default.parseCSV((await superagent_1.default.get("/msg.csv")).text);
    skyrouter_1.SkyRouter.route("**", Layout_1.default, ["checkholder"]);
    skyrouter_1.SkyRouter.route("", Home_1.default);
    skyrouter_1.SkyRouter.route("mates", Mates_1.default);
    skyrouter_1.SkyRouter.route("mates/gallery", Gallery_1.default);
    skyrouter_1.SkyRouter.route("mates/rarity", Rarity_1.default);
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
    skyrouter_1.SkyRouter.route("mix", Mix_1.default);
    skyrouter_1.SkyRouter.route("mix/buy", BuyMix_1.default);
    skyrouter_1.SkyRouter.route("mix/booth", Booth_1.default);
    skyrouter_1.SkyRouter.route("mix/devfund", DevFund_1.default);
    skyrouter_1.SkyRouter.route("mix/burnpool", BurnPool_1.default);
    skyrouter_1.SkyRouter.route("turntable", Turntable_1.default);
    skyrouter_1.SkyRouter.route("turntable/{id}", Detail_2.default, ["turntable/buy"]);
    skyrouter_1.SkyRouter.route("turntable/{id}/update", Update_1.default);
    skyrouter_1.SkyRouter.route("turntable/{id}/addmates", AddMates_1.default);
    skyrouter_1.SkyRouter.route("turntable/{id}/removemates", RemoveMates_1.default);
    skyrouter_1.SkyRouter.route("turntable/{id}/miningmates", MiningMates_1.default);
    skyrouter_1.SkyRouter.route("turntable/{id}/mateholders", MateHolders_1.default);
    skyrouter_1.SkyRouter.route("turntable/buy", BuyTurntable_1.default);
    skyrouter_1.SkyRouter.route("checkholder", CheckHolder_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
    if (await Wallet_1.default.connected() !== true) {
        await Wallet_1.default.connect();
    }
})();
//# sourceMappingURL=main.js.map