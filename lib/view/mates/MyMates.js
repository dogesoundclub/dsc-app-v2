"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const MateList_1 = __importDefault(require("../../component/mate/MateList"));
const MateContract_1 = __importDefault(require("../../contracts/MateContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class MyMates {
    constructor() {
        this.windowResizeHandler = () => {
            this.mateList.style({ height: window.innerHeight - 213 });
        };
        Layout_1.default.current.title = (0, msg_js_1.default)("MY_MATES_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mymates-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MY_MATES_TITLE")), this.wallet = (0, skynode_1.el)(".wallet"), this.mateList = new MateList_1.default()));
        this.windowResizeHandler();
        this.load();
        window.addEventListener("resize", this.windowResizeHandler);
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            this.wallet.appendText(`- ${(0, msg_js_1.default)("MY_MATES_WALLET_ADDRESS")} : `);
            this.wallet.append((0, skynode_1.el)("a", walletAddress, { href: `https://opensea.io/${walletAddress}` }));
            const balance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            const mates = [];
            const promises = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index) => {
                    const mateId = await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index);
                    mates.push(mateId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.mateList.draw(mates);
        }
    }
    changeParams(params, uri) { }
    close() {
        window.removeEventListener("resize", this.windowResizeHandler);
        this.container.delete();
    }
}
exports.default = MyMates;
//# sourceMappingURL=MyMates.js.map