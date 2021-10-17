import { DomNode, el } from "@hanul/skynode";

export default class OGsTab extends DomNode {

    constructor() {
        super(".mates-tab");
        this.append(
            el("p", "OGs는 추후 공개됩니다!"),
        );
    }
}
