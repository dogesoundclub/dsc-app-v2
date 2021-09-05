import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter } from "skyrouter";

class MenuTreeBuilder {

    public build(menus: {
        uri: string;
        name: string;
        children?: {
            uri: string;
            name: string;
        }[];
    }[]) {
        const lis: DomNode[] = [];
        for (const menuItem of menus) {
            const li = el("li",
                el(`a${location.pathname === `/${menuItem.uri}` ? ".on" : ""}`,
                    msg(menuItem.name),
                    {
                        click: () => SkyRouter.go(`/${menuItem.uri}`),
                    },
                ),
            );
            if (menuItem.children !== undefined) {
                li.append(this.build(menuItem.children));
            }
            lis.push(li);
        }
        return el("ul", ...lis);
    }
}

export default new MenuTreeBuilder();
