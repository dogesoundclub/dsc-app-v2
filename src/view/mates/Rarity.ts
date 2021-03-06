import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import MateList from "../../component/mate/MateList";
import rarity from "../../rarity.json";
import Layout from "../Layout";
import MateParts from "./MateParts.json";
import Mates from "./Mates.json";

export default class Rarity implements View {

    private container: DomNode;
    private mateList: MateList;

    private filter: { [key: string]: string } = {};
    private query: undefined | string;

    constructor() {
        Layout.current.title = msg("RARITY_TITLE");
        Layout.current.content.append(this.container = el(".rarity-view",
            el(".filter",
                el("h2", msg("RARITY_TITLE")),
                el("input", {
                    placeholder: msg("GALLERY_SEARCH_INPUT"),
                    change: (event, input) => {
                        this.query = (input.domElement as HTMLInputElement).value.trim();
                        if (this.query === "") {
                            this.query = undefined;
                        }
                        this.loadMates();
                    },
                }),
                ...Object.entries(MateParts).map(([key, values]) => {
                    const none = (rarity.traits as any)[key][""];
                    return el("select",
                        {
                            placeholder: key,
                            change: (event, select) => {
                                const value = (select.domElement as HTMLSelectElement).value;
                                Object.assign(this.filter, { [key]: value });
                                if (value === "") {
                                    delete this.filter[key];
                                }
                                this.loadMates();
                            },
                        },
                        el("option", key, { value: "" }),
                        key === "Face" ? undefined : el("option", `None (${none.count}) +${CommonUtil.numberWithCommas(String(none.score))}`, { value: "None" }),
                        ...values.map((value) => {
                            const r = (rarity.traits as any)[key][value];
                            return el("option", `${value} (${r.count}) +${CommonUtil.numberWithCommas(String(r.score))}`, { value });
                        }),
                    );
                }),
                el("a.reset-button", msg("GALLERY_RESET_FILTER_BUTTON"), {
                    click: () => {
                        this.filter = {};
                        this.query = undefined;
                        this.loadMates();
                    },
                }),
            ),
            this.mateList = new MateList(false, true),
        ));
        this.windowResizeHandler();
        this.loadMates();
        window.addEventListener("resize", this.windowResizeHandler);
    }

    private async loadMates() {

        const mates: number[] = [];

        const result = await superagent.get("https://api.dogesound.club/mate/names");
        const mateNames = result.body;

        for (const [id, token] of Mates.collection.entries()) {
            if (this.query !== undefined) {
                
                let queryId: number | undefined = parseInt(this.query, 10);
                queryId = isNaN(queryId) === true ? undefined : queryId;

                if (id === queryId || mateNames[id].replace(/ /g, "").toLowerCase().indexOf(this.query.replace(/ /g, "").toLowerCase()) !== -1) {
                    mates.push(id);
                }
            } else {
                let pass = true;
                if (Object.keys(this.filter).length > 0) {
                    for (const [key, value] of Object.entries(this.filter)) {
                        if (token.properties[key] !== value && (
                            value !== "None" ||
                            token.properties[key] !== undefined
                        )) {
                            pass = false;
                        }
                    }
                }
                if (pass === true) {
                    mates.push(id);
                }
            }
        }

        mates.sort((a, b) => (rarity.scores as any)[b] - (rarity.scores as any)[a]);
        this.mateList.load(mates);
    }

    private windowResizeHandler = () => {
        this.mateList.style({ height: window.innerHeight - 135 });
    };

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        window.removeEventListener("resize", this.windowResizeHandler);
        this.container.delete();
    }
}
