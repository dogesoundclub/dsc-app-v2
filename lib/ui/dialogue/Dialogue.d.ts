import { DomNode, Popup } from "@hanul/skynode";
export default class Dialogue extends Popup {
    content: DomNode;
    protected main: DomNode;
    constructor(tag: string, message: string, confirmTitle: string, confirm: () => void);
}
//# sourceMappingURL=Dialogue.d.ts.map