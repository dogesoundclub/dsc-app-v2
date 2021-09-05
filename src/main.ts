import msg from "msg.js";
import { SkyRouter } from "skyrouter";
import superagent from "superagent";
import BrowserInfo from "./BrowserInfo";
import Activities from "./view/Activities";
import DogeSound from "./view/activities/DogeSound";
import Home from "./view/Home";
import Layout from "./view/Layout";
import Mates from "./view/Mates";
import BuyMates from "./view/mates/BuyMates";
import Gallary from "./view/mates/Gallary";
import MateDetail from "./view/mates/MateDetail";
import MyMates from "./view/mates/MyMates";

(async () => {

    msg.language = BrowserInfo.language;
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);
    SkyRouter.route("activity", Activities);
    SkyRouter.route("activity/dogesound", DogeSound);
    SkyRouter.route("mates", Mates);
    SkyRouter.route("mates/gallary", Gallary);
    SkyRouter.route("mates/buy", BuyMates);
    SkyRouter.route("mates/mymates", MyMates);
    SkyRouter.route("mates/{id}", MateDetail, ["mates/gallary", "mates/buy", "mates/mymates"]);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }

})();