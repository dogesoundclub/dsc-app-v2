import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import MobileMenu from "../ui/menu/MobileMenu";
import PCMenu from "../ui/menu/PCMenu";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(this.container = el(".layout",
            el("header",
                el("a.menu-button", el("img", {
                    src: "/images/ui/menu-button.png",
                    srcset: "/images/ui/menu-button@2x.png 2x",
                }), {
                    click: (event, button) => {
                        const rect = button.rect;
                        new MobileMenu({ left: rect.right - 180, top: rect.bottom }).appendTo(BodyNode);
                    },
                }),
                new PCMenu(),
            ),
            el("main",
                this.content = el(".content"),
            ),
        ));
    }

    public set title(title: string) {
        document.title = `Doge Sound Club - ${title}`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
