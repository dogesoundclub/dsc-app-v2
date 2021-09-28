import msg from "msg.js";
import { SkyRouter } from "skyrouter";
import superagent from "superagent";
import BrowserInfo from "./BrowserInfo";
import MateContract from "./contracts/MateContract";
import VoteContract from "./contracts/VoteContract";
import Wallet from "./klaytn/Wallet";
import Activities from "./view/Activities";
import DogeSounds from "./view/activities/DogeSounds";
import Governance from "./view/Governance";
import Detail from "./view/governance/Detail";
import Propose from "./view/governance/Propose";
import Home from "./view/Home";
import Layout from "./view/Layout";
import Mates from "./view/Mates";
import BuyMates from "./view/mates/BuyMates";
import FollowMe from "./view/mates/FollowMe";
import Gallery from "./view/mates/Gallery";
import MateDetail from "./view/mates/MateDetail";
import MyMates from "./view/mates/MyMates";
//import Rarity from "./view/mates/Rarity";
import Terms from "./view/Terms";

(async () => {

    msg.language = BrowserInfo.language;
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);
    SkyRouter.route("mates", Mates);
    SkyRouter.route("mates/gallery", Gallery);
    //SkyRouter.route("mates/rarity", Rarity);
    SkyRouter.route("mates/followme", FollowMe);
    SkyRouter.route("mates/buy", BuyMates);
    SkyRouter.route("mates/mymates", MyMates);
    SkyRouter.route("mates/{id}", MateDetail, [
        "mates/gallery",
        "mates/rarity",
        "mates/followme",
        "mates/buy",
        "mates/mymates",
    ]);
    SkyRouter.route("activities", Activities);
    SkyRouter.route("dogesounds", DogeSounds);
    SkyRouter.route("governance", Governance);
    SkyRouter.route("governance/propose", Propose);
    SkyRouter.route("governance/{id}", Detail, ["governance/propose"]);
    SkyRouter.route("terms", Terms);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }

    if (await Wallet.connected() !== true) {
        await Wallet.connect();
    }
})();