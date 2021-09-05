import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mates implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = msg("MATES_TITLE");
        Layout.current.content.append(this.container = el(".mates-view",
            el("h1", msg("MATES_TITLE")),
            el("section",
                el("h2", msg("MATES_SECTION_1_TITLE")),
                el("p", msg("MATES_SECTION_1")),
            ),
            el("section",
                el("h2", msg("MATES_SECTION_2_TITLE")),
                el("p", msg("MATES_SECTION_2")),
            ),
            el("section",
                el("h2", msg("MATES_SECTION_3_TITLE")),
                el("a.all", { href: "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png", target: "_blank" },
                    el("img", { src: "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png" }),
                ),
                el("p", msg("MATES_SECTION_3")),
                el("a", { href: "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png", target: "_blank" },
                    "https://ipfs.io/ipfs/QmfTimyAQTQjQsnvECn9U44LdnPzSDF2XREoP2WFdjHitQ?filename=dscMates.png",
                ),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
