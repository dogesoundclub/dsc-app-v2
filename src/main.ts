import msg from "msg.js";
import { SkyRouter } from "skyrouter";
import superagent from "superagent";
import BrowserInfo from "./BrowserInfo";
import Wallet from "./klaytn/Wallet";
import Activities from "./view/Activities";
import DogeSounds from "./view/activities/DogeSounds";
import CheckCaseHolder from "./view/CheckCaseHolder";
import CheckEMateHolder from "./view/CheckEMateHolder";
import CheckMateHolder from "./view/CheckMateHolder";
import Governance from "./view/Governance";
import GovernanceDetail from "./view/governance/Detail";
import Propose from "./view/governance/Propose";
import Home from "./view/Home";
import Layout from "./view/Layout";
import Mates from "./view/Mates";
import BuyMates from "./view/mates/BuyMates";
import FollowMe from "./view/mates/FollowMe";
import Gallery from "./view/mates/Gallery";
import MateDetail from "./view/mates/MateDetail";
import MyMates from "./view/mates/MyMates";
import Rarity from "./view/mates/Rarity";
import Mix from "./view/Mix";
import Booth from "./view/mix/Booth";
import BurnPool from "./view/mix/BurnPool";
import BuyMix from "./view/mix/BuyMix";
import DevFund from "./view/mix/DevFund";
import Terms from "./view/Terms";
import { default as Turntable } from "./view/Turntable";
import AddMates from "./view/turntable/AddMates";
import BuyTurntable from "./view/turntable/BuyTurntable";
import TurntableDetail from "./view/turntable/Detail";
import MateHolders from "./view/turntable/MateHolders";
import MiningMates from "./view/turntable/MiningMates";
import RemoveMates from "./view/turntable/RemoveMates";
import Update from "./view/turntable/Update";

(async () => {

    msg.language = BrowserInfo.language;
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout, ["checkmateholder", "checkemateholder", "checkcaseholder"]);
    SkyRouter.route("", Home);
    SkyRouter.route("mates", Mates);
    SkyRouter.route("mates/gallery", Gallery);
    SkyRouter.route("mates/rarity", Rarity);
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
    SkyRouter.route("governance/{id}", GovernanceDetail, ["governance/propose"]);
    SkyRouter.route("terms", Terms);

    SkyRouter.route("mix", Mix);
    SkyRouter.route("mix/buy", BuyMix);
    //SkyRouter.route("mix/mining", NFTMining);
    SkyRouter.route("mix/booth", Booth);
    SkyRouter.route("mix/devfund", DevFund);
    SkyRouter.route("mix/burnpool", BurnPool);

    SkyRouter.route("turntable", Turntable);
    SkyRouter.route("turntable/{id}", TurntableDetail, ["turntable/buy"]);
    SkyRouter.route("turntable/{id}/update", Update);
    SkyRouter.route("turntable/{id}/addmates", AddMates);
    SkyRouter.route("turntable/{id}/removemates", RemoveMates);
    SkyRouter.route("turntable/{id}/miningmates", MiningMates);
    SkyRouter.route("turntable/{id}/mateholders", MateHolders);
    // SkyRouter.route("turntable/buy", BuyTurntable);

    SkyRouter.route("checkmateholder", CheckMateHolder);
    SkyRouter.route("checkemateholder", CheckEMateHolder);
    SkyRouter.route("checkcaseholder", CheckCaseHolder);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }

    if (await Wallet.connected() !== true) {
        await Wallet.connect();
    }
})();