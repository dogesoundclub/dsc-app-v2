import { SkyRouter } from "skyrouter";

class ViewUtil {

    public go(uri: string) {
        SkyRouter.go(uri);
        window.scrollTo(0, 0);
    }
}

export default new ViewUtil();
