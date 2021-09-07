import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter } from "skyrouter";

interface Menu {
    uri: string;
    name: string;
    children?: {
        uri: string;
        name: string;
    }[];
}

class MenuTreeBuilder {

    public build(menus: Menu[], parent?: Menu) {
        const lis: DomNode[] = parent === undefined ? [] : [el("li.parent",
            el(`a${location.pathname === `/${parent.uri}` ? ".on" : ""}`,
                msg(parent.name),
                {
                    click: () => {
                        SkyRouter.go(`/${parent.uri}`);
                        window.scrollTo(0, 0);
                    },
                },
            ),
        )];
        for (const menuItem of menus) {
            const li = el("li",
                el(`a${location.pathname === `/${menuItem.uri}` ? ".on" : ""}`,
                    msg(menuItem.name),
                    {
                        click: () => {
                            SkyRouter.go(`/${menuItem.uri}`);
                            window.scrollTo(0, 0);
                        },
                    },
                ),
            );
            if (menuItem.children !== undefined) {
                li.append(this.build(menuItem.children, menuItem));
            }
            lis.push(li);
        }
        return el("ul", ...lis);
    }
}

export default new MenuTreeBuilder();
