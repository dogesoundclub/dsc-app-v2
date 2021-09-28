import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Loading from "../../component/loading/Loading";
import MateList from "../../component/mate/MateList";
import MateContract from "../../contracts/MateContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";

export default class MyMates implements View {

    private container: DomNode;
    private wallet: DomNode;
    private mateList: MateList;
    private loading: Loading | undefined;

    constructor() {
        Layout.current.title = msg("MY_MATES_TITLE");
        Layout.current.content.append(this.container = el(".mymates-view",
            el("h1", msg("MY_MATES_TITLE")),
            this.wallet = el(".wallet"),
            this.loading = new Loading(),
            this.mateList = new MateList(false, false),
        ));
        this.windowResizeHandler();
        this.load();
        window.addEventListener("resize", this.windowResizeHandler);
    }

    private async load() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {

            this.wallet.appendText(`- ${msg("MY_MATES_WALLET_ADDRESS")} : `);
            this.wallet.append(el("a", walletAddress,
                { href: `https://opensea.io/${walletAddress}`, target: "_blank" },
            ));

            const balance = (await MateContract.balanceOf(walletAddress)).toNumber();

            const mates: number[] = [];
            const promises: Promise<void>[] = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index: number) => {
                    const mateId = await MateContract.tokenOfOwnerByIndex(walletAddress, index);
                    mates.push(mateId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            this.mateList.load(mates);
        }
        this.loading?.delete();
        this.loading = undefined;
    }

    private windowResizeHandler = () => {
        this.mateList.style({ height: window.innerHeight - 213 });
    };

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        window.removeEventListener("resize", this.windowResizeHandler);
        this.container.delete();
    }
}
