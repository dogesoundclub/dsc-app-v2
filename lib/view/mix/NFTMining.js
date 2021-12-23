"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const AnimalsPunksV2Tab_1 = __importDefault(require("../../component/mix/nftmining/ap2/AnimalsPunksV2Tab"));
const CasesByKateTab_1 = __importDefault(require("../../component/mix/nftmining/cbk/CasesByKateTab"));
const KLITSTab_1 = __importDefault(require("../../component/mix/nftmining/klits/KLITSTab"));
const MatesTab_1 = __importDefault(require("../../component/mix/nftmining/mates/MatesTab"));
const PixelCatTab_1 = __importDefault(require("../../component/mix/nftmining/pixelcat/PixelCatTab"));
const Layout_1 = __importDefault(require("../Layout"));
class NFTMining {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("NFT_MINING_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".nftmining-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("NFT_MINING_TITLE")), (0, skynode_1.el)("p", "아래 NFT를 보유하고 있으면 MIX를 분배받게 됩니다. NFT 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다."), (0, skynode_1.el)("p.warning", "* MIX 받기에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제로 받기 위한 것입니다."), (0, skynode_1.el)(".tabs", (0, skynode_1.el)("a", "Mates", {
            click: () => {
                this.tabContainer.empty().append(new MatesTab_1.default());
            },
        }), (0, skynode_1.el)("a", "Cases by Kate", {
            click: () => {
                this.tabContainer.empty().append(new CasesByKateTab_1.default());
            },
        }), (0, skynode_1.el)("a", "Animals Punks V2", {
            click: () => {
                this.tabContainer.empty().append(new AnimalsPunksV2Tab_1.default());
            },
        }), (0, skynode_1.el)("a", "Pixel Cat", {
            click: () => {
                this.tabContainer.empty().append(new PixelCatTab_1.default());
            },
        }), (0, skynode_1.el)("a", "KLITS", {
            click: () => {
                this.tabContainer.empty().append(new KLITSTab_1.default());
            },
        })), this.tabContainer = (0, skynode_1.el)(".tab-container", new MatesTab_1.default())));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = NFTMining;
//# sourceMappingURL=NFTMining.js.map