import { DomNode, el } from "@hanul/skynode";
import { constants, utils } from "ethers";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import Loading from "../../component/loading/Loading";
import MateMessageList from "../../component/matemessage/MateMessageList";
import MatesPoolContract from "../../contracts/mix/MatesPoolContract";
import MixContract from "../../contracts/mix/MixContract";
import AttributesContract from "../../contracts/nft/AttributesContract";
import FollowMeContract from "../../contracts/nft/FollowMeContract";
import ImageContract from "../../contracts/nft/ImageContract";
import MateContract from "../../contracts/nft/MateContract";
import MessageContract from "../../contracts/nft/MessageContract";
import NameV2Contract from "../../contracts/nft/NameV2Contract";
import Wallet from "../../klaytn/Wallet";
import Alert from "../../ui/dialogue/Alert";
import Confirm from "../../ui/dialogue/Confirm";
import Prompt from "../../ui/dialogue/Prompt";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class MateDetail implements View {

    private id: number;

    private container: DomNode;
    private nameDisplay: DomNode;
    private mixDisplay: DomNode;
    private snsDisplay: DomNode;
    private messagesTitle: DomNode;

    constructor(params: ViewParams) {
        this.id = parseInt(params.id, 10);
        Layout.current.title = msg("MATE_DETAIL_TITLE").replace(/{id}/, String(this.id));
        Layout.current.content.append(this.container = el(".matedetail-view",

            this.nameDisplay = el("h1"),
            el("img.mate-image", { src: `https://storage.googleapis.com/dsc-mate/336/dscMate-${this.id}.png` }),
            el(".mix",
                `${msg("MATE_DETAIL_MIX")}: `,
                this.mixDisplay = el("span", new Loading()),
            ),
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

        const claimable = await MatesPoolContract.claimableOf(this.id);
        this.mixDisplay.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(claimable)));

        this.nameDisplay.append(new Loading());

        await superagent.get(`https://api.dogesound.club/mate/${this.id}`);

        let name = await NameV2Contract.names(MateContract.address, this.id);
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

            const mixForChanging = await NameV2Contract.getMIXForChanging();
            const mixForDeleting = await NameV2Contract.getMIXForDeleting();

            this.container.append(
                el("a.transfer-button", msg("MATE_TRANSFER_BUTTON"), {
                    click: () => {
                        new Prompt(msg("MATE_TRANSFER_CONFIRM_MESSAGE").replace(/{name}/, name), msg("MATE_TRANSFER_CONFIRM_BUTTON"), async (address) => {
                            await MateContract.transfer(address, this.id);
                        });
                    },
                }),

                // ????????? ????????????
                el("section",
                    el("h2", msg("MATE_DETAIL_NAME_FORM_TITLE")),
                    el("p", msg("MATE_DETAIL_NAME_FORM_DESCRIPTION")
                        .replace(/{mixForChanging}/g, String(parseInt(utils.formatEther(mixForChanging), 10)))
                        .replace(/{mixForDeleting}/g, String(parseInt(utils.formatEther(mixForDeleting), 10)))
                    ),
                    nameInput = el("input", { placeholder: msg("MATE_DETAIL_NAME_FORM_INPUT") }),
                    el("label.terms",
                        nameTermCheckbox = el("input", { type: "checkbox" }),
                        el("p", msg("MATE_DETAIL_NAME_FORM_TERMS")
                            .replace(/{mixForChanging}/g, String(parseInt(utils.formatEther(mixForChanging), 10)))
                            .replace(/{mixForDeleting}/g, String(parseInt(utils.formatEther(mixForDeleting), 10)))
                        ),
                    ),
                    el("a.submit-button", msg("MATE_DETAIL_NAME_FORM_SUBMIT"), {
                        click: async () => {
                            if (nameTermCheckbox.domElement.checked === true) {
                                const mixNeeded = await NameV2Contract.named(MateContract.address, this.id) !== true ? 0 : await NameV2Contract.getMIXForChanging();

                                const balance = await MixContract.balanceOf(owner);
                                if (balance.lt(mixNeeded)) {
                                    new Confirm(`${String(parseInt(utils.formatEther(mixNeeded), 10))} ????????? ???????????????.`, "?????? ??????", () => {
                                        open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                                    });
                                }

                                else if ((await MixContract.allowance(owner, NameV2Contract.address)).lt(mixNeeded)) {
                                    await MixContract.approve(NameV2Contract.address, constants.MaxUint256);
                                    setTimeout(async () => {
                                        const name = nameInput.domElement.value;
                                        if (await NameV2Contract.exists(name) === true) {
                                            new Alert(msg("MATE_NAME_EXISTS_ERROR"), msg("CONFIRM_BUTTON"));
                                        } else {
                                            await NameV2Contract.set(MateContract.address, this.id, name);
                                            ViewUtil.waitTransactionAndRefresh();
                                        }
                                    }, 2000);
                                }

                                else {
                                    const name = nameInput.domElement.value;
                                    if (await NameV2Contract.exists(name) === true) {
                                        new Alert(msg("MATE_NAME_EXISTS_ERROR"), msg("CONFIRM_BUTTON"));
                                    } else {
                                        await NameV2Contract.set(MateContract.address, this.id, name);
                                        ViewUtil.waitTransactionAndRefresh();
                                    }
                                }
                            }
                        },
                    }),
                    el(".remove-button-container",
                        el("a.remove-name-button", msg("MATE_DETAIL_REMOVE_NAME_BUTTON"), {
                            click: async () => {
                                new Confirm(msg("MATE_DETAIL_REMOVE_NAME_CONFIRM"), msg("CONFIRM_BUTTON"), async () => {
                                    const mixNeeded = await NameV2Contract.getMIXForDeleting();

                                    const balance = await MixContract.balanceOf(owner);
                                    if (balance.lt(mixNeeded)) {
                                        new Confirm(`${String(parseInt(utils.formatEther(mixNeeded), 10))} ????????? ???????????????.`, "?????? ??????", () => {
                                            open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                                        });
                                    }

                                    else if ((await MixContract.allowance(owner, NameV2Contract.address)).lt(mixNeeded)) {
                                        await MixContract.approve(NameV2Contract.address, constants.MaxUint256);
                                        setTimeout(async () => {
                                            await NameV2Contract.remove(MateContract.address, this.id);
                                            ViewUtil.waitTransactionAndRefresh();
                                        }, 2000);
                                    }

                                    else {
                                        await NameV2Contract.remove(MateContract.address, this.id);
                                        ViewUtil.waitTransactionAndRefresh();
                                    }
                                });
                            },
                        }),
                    ),
                ),

                // ????????? ???
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
                                ViewUtil.waitTransactionAndRefresh();
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
                                ViewUtil.waitTransactionAndRefresh();
                            },
                        }),
                    ),
                    el(".sns-terms",
                        el("p", "* ", msg("MATE_DETAIL_SNS_FORM_TERMS")),
                    ),
                ),

                // ????????? ?????????
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
                                    ViewUtil.waitTransactionAndRefresh();
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
