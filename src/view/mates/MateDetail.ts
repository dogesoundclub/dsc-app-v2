import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import MateMessageList from "../../component/matemessage/MateMessageList";
import AttributesContract from "../../contracts/AttributesContract";
import ImageContract from "../../contracts/ImageContract";
import MateContract from "../../contracts/MateContract";
import MessageContract from "../../contracts/MessageContract";
import NameContract from "../../contracts/NameContract";
import Alert from "../../ui/dialogue/Alert";
import Prompt from "../../ui/dialogue/Prompt";
import Layout from "../Layout";

export default class MateDetail implements View {

    private id: number;

    private container: DomNode;
    private nameDisplay: DomNode;
    private messagesTitle: DomNode;
    private transferButton: DomNode;
    private nameInput: DomNode<HTMLInputElement>;
    private nameTermCheckbox: DomNode<HTMLInputElement>;
    private messageInput: DomNode<HTMLInputElement>;
    private messageTermCheckbox: DomNode<HTMLInputElement>;

    constructor(params: ViewParams) {
        this.id = parseInt(params.id, 10);
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        Layout.current.content.append(this.container = el(".matedetail-view",

            this.nameDisplay = el("h1"),
            el("img.mate-image", { src: `https://storage.googleapis.com/dsc-mate/336/dscMate-${this.id}.png` }),
            el("a.opensea-button", msg("MATE_DETAIL_OPENSEA_BUTTON"), { href: `https://opensea.io/assets/klaytn/0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae/${this.id}` }),
            el("section",
                this.messagesTitle = el("h2"),
                new MateMessageList(this.id),
            ),
            this.transferButton = el("a.transfer-button", msg("MATE_TRANSFER_BUTTON")),

            // 메이트 이름짓기
            el("section",
                el("h2", msg("MATE_DETAIL_NAME_FORM_TITLE")),
                el("p", msg("MATE_DETAIL_NAME_FORM_DESCRIPTION")),
                this.nameInput = el("input", { placeholder: msg("MATE_DETAIL_NAME_FORM_INPUT") }),
                el("label.terms",
                    this.nameTermCheckbox = el("input", { type: "checkbox" }),
                    el("p", msg("MATE_DETAIL_NAME_FORM_TERMS")),
                ),
                el("a.submit-button", msg("MATE_DETAIL_NAME_FORM_SUBMIT"), {
                    click: async () => {
                        if (this.nameTermCheckbox.domElement.checked === true) {
                            const name = this.nameInput.domElement.value;
                            if (await NameContract.exists(name) === true) {
                                new Alert(msg("MATE_NAME_EXISTS_ERROR"), msg("CONFIRM_BUTTON"));
                            } else {
                                await NameContract.set(this.id, name);
                                setTimeout(() => SkyRouter.refresh(), 2000);
                            }
                        }
                    },
                }),
            ),

            // 메시지 남기기
            el("section",
                el("h2", msg("MATE_DETAIL_MESSAGE_FORM_TITLE")),
                el("p", msg("MATE_DETAIL_MESSAGE_FORM_DESCRIPTION")),
                this.messageInput = el("input.message", { placeholder: msg("MATE_DETAIL_MESSAGE_FORM_INPUT") }),
                el("label.terms",
                    this.messageTermCheckbox = el("input", { type: "checkbox" }),
                    el("p", msg("MATE_DETAIL_MESSAGE_FORM_TERMS")),
                ),
                el("a.submit-button", msg("MATE_DETAIL_MESSAGE_FORM_SUBMIT"), {
                    click: async () => {
                        if (this.messageTermCheckbox.domElement.checked === true) {
                            if ((await MessageContract.remainBlocks(this.id)).toNumber() !== 0) {
                                new Alert(msg("MATE_DETAIL_MESSAGE_NOT_READY_ERROR"), msg("CONFIRM_BUTTON"));
                            } else {
                                await MessageContract.set(this.id, this.messageInput.domElement.value);
                                setTimeout(() => SkyRouter.refresh(), 2000);
                            }
                        }
                    },
                }),
            ),

            // Fully on-chain
            el("section",
                el("h2", msg("MATE_DETAIL_ON_CHAIN_TITLE")),
                el("h3", msg("MATE_DETAIL_ON_CHAIN_SUBTITLE")),
                el("p", msg("MATE_DETAIL_ON_CHAIN_DESCRIPTION")),
            ),
            el("section",
                el("h2", msg("MATE_DETAIL_ON_CHAIN_DEMO_TITLE")),
                el("p", msg("MATE_DETAIL_ON_CHAIN_DEMO_DESCRIPTION")),
            ),
        ));
        this.loadName();
        this.loadOnChainData();
    }

    private async loadName() {
        await superagent.get(`https://api.dogesound.club/mate/${this.id}`);

        this.nameDisplay.appendText(msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id)));
        let name = await NameContract.getName(this.id);
        if (name !== "") {
            this.nameDisplay.appendText(` - ${name}`);
        } else {
            name = msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        }
        this.messagesTitle.appendText(msg("MATE_DETAIL_MESSAGES_TITLE").replace(/{name}/, name));

        this.transferButton.onDom("click", () => {
            new Prompt(msg("MATE_TRANSFER_CONFIRM_MESSAGE").replace(/{name}/, name), msg("MATE_TRANSFER_CONFIRM_BUTTON"), async (address) => {
                await MateContract.transfer(address, this.id);
            });
        });
    }

    private async loadOnChainData() {

        const image = await ImageContract.image(this.id);

        const attributes: any = {};
        const promises: Promise<void>[] = [];
        promises.push((async () => {
            attributes.level = `Level ${await AttributesContract.level(this.id)}`;
        })());
        promises.push((async () => {
            attributes.face = await AttributesContract.face(this.id);
        })());
        promises.push((async () => {
            attributes.faceDetailA = await AttributesContract.faceDetailA(this.id);
        })());
        promises.push((async () => {
            attributes.faceDetailB = await AttributesContract.faceDetailB(this.id);
        })());
        promises.push((async () => {
            attributes.neck = await AttributesContract.neck(this.id);
        })());
        promises.push((async () => {
            attributes.mouth = await AttributesContract.mouth(this.id);
        })());
        promises.push((async () => {
            attributes.eyes = await AttributesContract.eyes(this.id);
        })());
        promises.push((async () => {
            attributes.forehead = await AttributesContract.forehead(this.id);
        })());
        promises.push((async () => {
            attributes.headwear = await AttributesContract.headwear(this.id);
        })());
        promises.push((async () => {
            attributes.headwearDetail = await AttributesContract.headwearDetail(this.id);
        })());
        promises.push((async () => {
            attributes.ears = await AttributesContract.ears(this.id);
        })());
        promises.push((async () => {
            attributes.items = await AttributesContract.items(this.id);
        })());
        await Promise.all(promises);

        this.container.append(el("section.on-chain",
            el("img", { src: image }),
            el("p", Object.values(attributes).filter((v) => v !== "").join(", ")),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void {
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
    }

    public close(): void {
        this.container.delete();
    }
}
