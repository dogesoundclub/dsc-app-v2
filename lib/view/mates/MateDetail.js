"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const Loading_1 = __importDefault(require("../../component/loading/Loading"));
const MateMessageList_1 = __importDefault(require("../../component/matemessage/MateMessageList"));
const AttributesContract_1 = __importDefault(require("../../contracts/AttributesContract"));
const FollowMeContract_1 = __importDefault(require("../../contracts/FollowMeContract"));
const ImageContract_1 = __importDefault(require("../../contracts/ImageContract"));
const MateContract_1 = __importDefault(require("../../contracts/MateContract"));
const MessageContract_1 = __importDefault(require("../../contracts/MessageContract"));
const NameContract_1 = __importDefault(require("../../contracts/NameContract"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Alert_1 = __importDefault(require("../../ui/dialogue/Alert"));
const Prompt_1 = __importDefault(require("../../ui/dialogue/Prompt"));
const Layout_1 = __importDefault(require("../Layout"));
class MateDetail {
    constructor(params) {
        this.id = parseInt(params.id, 10);
        Layout_1.default.current.title = (0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".matedetail-view", this.nameDisplay = (0, skynode_1.el)("h1"), (0, skynode_1.el)("img.mate-image", { src: `https://storage.googleapis.com/dsc-mate/336/dscMate-${this.id}.png` }), (0, skynode_1.el)("a.opensea-button", (0, msg_js_1.default)("MATE_DETAIL_OPENSEA_BUTTON"), { href: `https://opensea.io/assets/klaytn/0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae/${this.id}`, target: "_blank" }), this.snsDisplay = (0, skynode_1.el)("section"), (0, skynode_1.el)("section", this.messagesTitle = (0, skynode_1.el)("h2"), new MateMessageList_1.default(this.id))));
        this.load();
        this.loadSNS();
    }
    async load() {
        this.nameDisplay.append(new Loading_1.default());
        await superagent_1.default.get(`https://api.dogesound.club/mate/${this.id}`);
        let name = await NameContract_1.default.getName(this.id);
        this.nameDisplay.empty().appendText((0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id)));
        if (name !== "") {
            this.nameDisplay.appendText(` - ${name}`);
        }
        else {
            name = (0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        }
        this.messagesTitle.appendText((0, msg_js_1.default)("MATE_DETAIL_MESSAGES_TITLE").replace(/{name}/, name));
        const owner = await MateContract_1.default.ownerOf(this.id);
        if (owner === await Wallet_1.default.loadAddress()) {
            let nameInput;
            let nameTermCheckbox;
            let twitterInput;
            let instagramInput;
            let messageInput;
            let messageTermCheckbox;
            this.container.append((0, skynode_1.el)("a.transfer-button", (0, msg_js_1.default)("MATE_TRANSFER_BUTTON"), {
                click: () => {
                    new Prompt_1.default((0, msg_js_1.default)("MATE_TRANSFER_CONFIRM_MESSAGE").replace(/{name}/, name), (0, msg_js_1.default)("MATE_TRANSFER_CONFIRM_BUTTON"), async (address) => {
                        await MateContract_1.default.transfer(address, this.id);
                    });
                },
            }), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATE_DETAIL_NAME_FORM_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATE_DETAIL_NAME_FORM_DESCRIPTION")), nameInput = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("MATE_DETAIL_NAME_FORM_INPUT") }), (0, skynode_1.el)("label.terms", nameTermCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATE_DETAIL_NAME_FORM_TERMS"))), (0, skynode_1.el)("a.submit-button", (0, msg_js_1.default)("MATE_DETAIL_NAME_FORM_SUBMIT"), {
                click: async () => {
                    if (nameTermCheckbox.domElement.checked === true) {
                        const name = nameInput.domElement.value;
                        if (await NameContract_1.default.exists(name) === true) {
                            new Alert_1.default((0, msg_js_1.default)("MATE_NAME_EXISTS_ERROR"), (0, msg_js_1.default)("CONFIRM_BUTTON"));
                        }
                        else {
                            await NameContract_1.default.set(this.id, name);
                            setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                        }
                    }
                },
            })), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATE_DETAIL_SNS_FORM_INPUT")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATE_DETAIL_SNS_FORM_DESCRIPTION")), (0, skynode_1.el)(".sns-form", (0, skynode_1.el)("label", (0, msg_js_1.default)("MATE_DETAIL_SNS_FORM_TWITTER")), (0, skynode_1.el)(".input-container", "@", twitterInput = (0, skynode_1.el)("input")), (0, skynode_1.el)("a.submit-button", (0, msg_js_1.default)("MATE_DETAIL_SNS_FORM_TWITTER_SUBMIT"), {
                click: async () => {
                    await FollowMeContract_1.default.set(MateContract_1.default.address, this.id, 0, twitterInput.domElement.value);
                    setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                },
            })), (0, skynode_1.el)(".sns-form", (0, skynode_1.el)("label", (0, msg_js_1.default)("MATE_DETAIL_SNS_FORM_INSTAGRAM")), (0, skynode_1.el)(".input-container", "@", instagramInput = (0, skynode_1.el)("input")), (0, skynode_1.el)("a.submit-button", (0, msg_js_1.default)("MATE_DETAIL_SNS_FORM_INSTAGRAM_SUBMIT"), {
                click: async () => {
                    await FollowMeContract_1.default.set(MateContract_1.default.address, this.id, 1, instagramInput.domElement.value);
                    setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                },
            })), (0, skynode_1.el)(".sns-terms", (0, skynode_1.el)("p", "* ", (0, msg_js_1.default)("MATE_DETAIL_SNS_FORM_TERMS")))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATE_DETAIL_MESSAGE_FORM_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATE_DETAIL_MESSAGE_FORM_DESCRIPTION")), messageInput = (0, skynode_1.el)("input.message", { placeholder: (0, msg_js_1.default)("MATE_DETAIL_MESSAGE_FORM_INPUT") }), (0, skynode_1.el)("label.terms", messageTermCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATE_DETAIL_MESSAGE_FORM_TERMS"))), (0, skynode_1.el)("a.submit-button", (0, msg_js_1.default)("MATE_DETAIL_MESSAGE_FORM_SUBMIT"), {
                click: async () => {
                    if (messageTermCheckbox.domElement.checked === true) {
                        if ((await MessageContract_1.default.remainBlocks(this.id)).toNumber() !== 0) {
                            new Alert_1.default((0, msg_js_1.default)("MATE_DETAIL_MESSAGE_NOT_READY_ERROR"), (0, msg_js_1.default)("CONFIRM_BUTTON"));
                        }
                        else {
                            await MessageContract_1.default.set(this.id, messageInput.domElement.value);
                            setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                        }
                    }
                },
            })));
        }
        const image = await ImageContract_1.default.image(this.id);
        const attributes = {};
        const promises = [];
        promises.push((async () => {
            attributes.level = `Level ${await AttributesContract_1.default.level(this.id)}`;
        })());
        promises.push((async () => {
            attributes.face = await AttributesContract_1.default.face(this.id);
        })());
        promises.push((async () => {
            attributes.faceDetailA = await AttributesContract_1.default.faceDetailA(this.id);
        })());
        promises.push((async () => {
            attributes.faceDetailB = await AttributesContract_1.default.faceDetailB(this.id);
        })());
        promises.push((async () => {
            attributes.neck = await AttributesContract_1.default.neck(this.id);
        })());
        promises.push((async () => {
            attributes.mouth = await AttributesContract_1.default.mouth(this.id);
        })());
        promises.push((async () => {
            attributes.eyes = await AttributesContract_1.default.eyes(this.id);
        })());
        promises.push((async () => {
            attributes.forehead = await AttributesContract_1.default.forehead(this.id);
        })());
        promises.push((async () => {
            attributes.headwear = await AttributesContract_1.default.headwear(this.id);
        })());
        promises.push((async () => {
            attributes.headwearDetail = await AttributesContract_1.default.headwearDetail(this.id);
        })());
        promises.push((async () => {
            attributes.ears = await AttributesContract_1.default.ears(this.id);
        })());
        promises.push((async () => {
            attributes.items = await AttributesContract_1.default.items(this.id);
        })());
        await Promise.all(promises);
        this.container.append((0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATE_DETAIL_ON_CHAIN_TITLE")), (0, skynode_1.el)("h3", (0, msg_js_1.default)("MATE_DETAIL_ON_CHAIN_SUBTITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATE_DETAIL_ON_CHAIN_DESCRIPTION"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", (0, msg_js_1.default)("MATE_DETAIL_ON_CHAIN_DEMO_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("MATE_DETAIL_ON_CHAIN_DEMO_DESCRIPTION"))), (0, skynode_1.el)("section.on-chain", (0, skynode_1.el)("img", { src: image }), (0, skynode_1.el)("p", Object.values(attributes).filter((v) => v !== "").join(", "))));
    }
    async loadSNS() {
        const twitter = await FollowMeContract_1.default.followMe(MateContract_1.default.address, this.id, 0);
        const instagram = await FollowMeContract_1.default.followMe(MateContract_1.default.address, this.id, 1);
        if (twitter !== "" || instagram !== "") {
            this.snsDisplay.empty().append((0, skynode_1.el)("h2", (0, msg_js_1.default)("MATE_DETAIL_SNS_TITLE")), twitter === "" ? undefined : (0, skynode_1.el)(".sns", (0, skynode_1.el)("label", (0, msg_js_1.default)("MATE_DETAIL_SNS_TWITTER")), (0, skynode_1.el)("a", `@${twitter}`, { href: `https://twitter.com/${twitter}`, target: "_blank" })), instagram === "" ? undefined : (0, skynode_1.el)(".sns", (0, skynode_1.el)("label", (0, msg_js_1.default)("MATE_DETAIL_SNS_INSTAGRAM")), (0, skynode_1.el)("a", `@${instagram}`, { href: `https://instagram.com/${instagram}`, target: "_blank" })));
        }
    }
    changeParams(params, uri) {
        Layout_1.default.current.title = (0, msg_js_1.default)("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
    }
    close() {
        this.container.delete();
    }
}
exports.default = MateDetail;
//# sourceMappingURL=MateDetail.js.map