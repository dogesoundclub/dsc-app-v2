import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import AnimalsPunksV2Tab from "../../component/mix/nftmining/ap2/AnimalsPunksV2Tab";
import CasesByKateTab from "../../component/mix/nftmining/cbk/CasesByKateTab";
import KLITSTab from "../../component/mix/nftmining/klits/KLITSTab";
import MatesTab from "../../component/mix/nftmining/mates/MatesTab";
import PixelCatTab from "../../component/mix/nftmining/pixelcat/PixelCatTab";
import Layout from "../Layout";

export default class NFTMining implements View {

    private container: DomNode;
    private tabContainer: DomNode;

    constructor() {
        Layout.current.title = msg("NFT_MINING_TITLE");
        Layout.current.content.append(this.container = el(".nftmining-view",
            el("h1", msg("NFT_MINING_TITLE")),
            el("p", "아래 NFT를 보유하고 있으면 MIX를 분배받게 됩니다. NFT 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다."),
            el("p.warning", "* MIX 받기에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제로 받기 위한 것입니다."),
            el(".tabs",
                el("a", "Mates", {
                    click: () => {
                        this.tabContainer.empty().append(new MatesTab());
                    },
                }),
                el("a", "Cases by Kate", {
                    click: () => {
                        this.tabContainer.empty().append(new CasesByKateTab());
                    },
                }),
                el("a", "Animals Punks V2", {
                    click: () => {
                        this.tabContainer.empty().append(new AnimalsPunksV2Tab());
                    },
                }),
                el("a", "Pixel Cat", {
                    click: () => {
                        this.tabContainer.empty().append(new PixelCatTab());
                    },
                }),
                el("a", "KLITS", {
                    click: () => {
                        this.tabContainer.empty().append(new KLITSTab());
                    },
                }),
            ),
            this.tabContainer = el(".tab-container",
                new MatesTab(),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
