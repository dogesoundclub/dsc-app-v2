import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import superagent from "superagent";
import Loading from "../../component/loading/Loading";
import MateMessageList from "../../component/matemessage/MateMessageList";
import AttributesContract from "../../contracts/AttributesContract";
import FollowMeContract from "../../contracts/FollowMeContract";
import ImageContract from "../../contracts/ImageContract";
import MateContract from "../../contracts/MateContract";
import MessageContract from "../../contracts/MessageContract";
import NameContract from "../../contracts/NameContract";
import Wallet from "../../klaytn/Wallet";
import Alert from "../../ui/dialogue/Alert";
import Prompt from "../../ui/dialogue/Prompt";
import Layout from "../Layout";

export default class MateDetail implements View {

    private id: number;

    private container: DomNode;
    private nameDisplay: DomNode;
    private snsDisplay: DomNode;
    private messagesTitle: DomNode;

    constructor(params: ViewParams) {
        this.id = parseInt(params.id, 10);
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        Layout.current.content.append(this.container = el(".matedetail-view",

            this.nameDisplay = el("h1"),
            el("img.mate-image", { src: `https://storage.googleapis.com/dsc-mate/336/dscMate-${this.id}.png` }),
            el("a.opensea-button", msg("MATE_DETAIL_OPENSEA_BUTTON"), { href: `https://opensea.io/assets/klaytn/0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae/${this.id}`, target: "_blank" }),
            this.snsDisplay = el("section"),
            el("section",
                this.messagesTitle = el("h2"),
                new MateMessageList(this.id),
            ),
        ));

        this.load();
        this.loadSNS();
    }

    private async load() {

        this.nameDisplay.append(new Loading());

        await superagent.get(`https://api.dogesound.club/mate/${this.id}`);

        let name = await NameContract.getName(this.id);
        this.nameDisplay.empty().appendText(msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id)));
        if (name !== "") {
            this.nameDisplay.appendText(` - ${name}`);
        } else {
            name = msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        }
        this.messagesTitle.appendText(msg("MATE_DETAIL_MESSAGES_TITLE").replace(/{name}/, name));

        const owner = await MateContract.ownerOf(this.id);
        if (owner === await Wallet.loadAddress()) {

            let nameInput: DomNode<HTMLInputElement>;
            let nameTermCheckbox: DomNode<HTMLInputElement>;
            let twitterInput: DomNode<HTMLInputElement>;
            let instagramInput: DomNode<HTMLInputElement>;
            let messageInput: DomNode<HTMLInputElement>;
            let messageTermCheckbox: DomNode<HTMLInputElement>;

            this.container.append(
                el("a.transfer-button", msg("MATE_TRANSFER_BUTTON"), {
                    click: () => {
                        new Prompt(msg("MATE_TRANSFER_CONFIRM_MESSAGE").replace(/{name}/, name), msg("MATE_TRANSFER_CONFIRM_BUTTON"), async (address) => {
                            await MateContract.transfer(address, this.id);
                        });
                    },
                }),

                // 메이트 이름짓기
                el("section",
                    el("h2", msg("MATE_DETAIL_NAME_FORM_TITLE")),
                    el("p", msg("MATE_DETAIL_NAME_FORM_DESCRIPTION")),
                    nameInput = el("input", { placeholder: msg("MATE_DETAIL_NAME_FORM_INPUT") }),
                    el("label.terms",
                        nameTermCheckbox = el("input", { type: "checkbox" }),
                        el("p", msg("MATE_DETAIL_NAME_FORM_TERMS")),
                    ),
                    el("a.submit-button", msg("MATE_DETAIL_NAME_FORM_SUBMIT"), {
                        click: async () => {
                            if (nameTermCheckbox.domElement.checked === true) {
                                const name = nameInput.domElement.value;
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

                // 팔로우 미
                el("section",
                    el("h2", msg("MATE_DETAIL_SNS_FORM_INPUT")),
                    el("p", msg("MATE_DETAIL_SNS_FORM_DESCRIPTION")),
                    el(".sns-form",
                        el("label", msg("MATE_DETAIL_SNS_FORM_TWITTER")),
                        el(".input-container",
                            "@", twitterInput = el("input"),
                        ),
                        el("a.submit-button", msg("MATE_DETAIL_SNS_FORM_TWITTER_SUBMIT"), {
                            click: async () => {
                                await FollowMeContract.set(MateContract.address, this.id, 0, twitterInput.domElement.value);
                                setTimeout(() => SkyRouter.refresh(), 2000);
                            },
                        }),
                    ),
                    el(".sns-form",
                        el("label", msg("MATE_DETAIL_SNS_FORM_INSTAGRAM")),
                        el(".input-container",
                            "@", instagramInput = el("input"),
                        ),
                        el("a.submit-button", msg("MATE_DETAIL_SNS_FORM_INSTAGRAM_SUBMIT"), {
                            click: async () => {
                                await FollowMeContract.set(MateContract.address, this.id, 1, instagramInput.domElement.value);
                                setTimeout(() => SkyRouter.refresh(), 2000);
                            },
                        }),
                    ),
                    el(".sns-terms",
                        el("p", "* ", msg("MATE_DETAIL_SNS_FORM_TERMS")),
                    ),
                ),

                // 메시지 남기기
                el("section",
                    el("h2", msg("MATE_DETAIL_MESSAGE_FORM_TITLE")),
                    el("p", msg("MATE_DETAIL_MESSAGE_FORM_DESCRIPTION")),
                    messageInput = el("input.message", { placeholder: msg("MATE_DETAIL_MESSAGE_FORM_INPUT") }),
                    el("label.terms",
                        messageTermCheckbox = el("input", { type: "checkbox" }),
                        el("p", msg("MATE_DETAIL_MESSAGE_FORM_TERMS")),
                    ),
                    el("a.submit-button", msg("MATE_DETAIL_MESSAGE_FORM_SUBMIT"), {
                        click: async () => {
                            if (messageTermCheckbox.domElement.checked === true) {
                                if ((await MessageContract.remainBlocks(this.id)).toNumber() !== 0) {
                                    new Alert(msg("MATE_DETAIL_MESSAGE_NOT_READY_ERROR"), msg("CONFIRM_BUTTON"));
                                } else {
                                    await MessageContract.set(this.id, messageInput.domElement.value);
                                    setTimeout(() => SkyRouter.refresh(), 2000);
                                }
                            }
                        },
                    }),
                ),
            );
        }

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

        this.container.append(
            el("section",
                el("h2", msg("MATE_DETAIL_ON_CHAIN_TITLE")),
                el("h3", msg("MATE_DETAIL_ON_CHAIN_SUBTITLE")),
                el("p", msg("MATE_DETAIL_ON_CHAIN_DESCRIPTION")),
            ),
            el("section",
                el("h2", msg("MATE_DETAIL_ON_CHAIN_DEMO_TITLE")),
                el("p", msg("MATE_DETAIL_ON_CHAIN_DEMO_DESCRIPTION")),
            ),
            el("section.on-chain",
                el("img", { src: image }),
                el("p", Object.values(attributes).filter((v) => v !== "").join(", ")),
            ),
        );
    }

    private async loadSNS() {

        const twitter = await FollowMeContract.followMe(MateContract.address, this.id, 0);
        const instagram = await FollowMeContract.followMe(MateContract.address, this.id, 1);

        if (twitter !== "" || instagram !== "") {
            this.snsDisplay.empty().append(
                el("h2", msg("MATE_DETAIL_SNS_TITLE")),
                twitter === "" ? undefined : el(".sns",
                    el("label", msg("MATE_DETAIL_SNS_TWITTER")),
                    el("a", `@${twitter}`, { href: `https://twitter.com/${twitter}`, target: "_blank" }),
                ),
                instagram === "" ? undefined : el(".sns",
                    el("label", msg("MATE_DETAIL_SNS_INSTAGRAM")),
                    el("a", `@${instagram}`, { href: `https://instagram.com/${instagram}`, target: "_blank" }),
                ),
            );
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, params.id);
    }

    public close(): void {
        this.container.delete();
    }
}
