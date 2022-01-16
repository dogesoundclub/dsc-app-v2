import { DomNode } from "@hanul/skynode";
interface Menu {
    href?: string;
    uri?: string;
    name: string;
    children?: {
        href?: string;
        uri?: string;
        name: string;
    }[];
}
declare class MenuTreeBuilder {
    build(menus: Menu[], parent?: Menu): DomNode<HTMLElement>;
}
declare const _default: MenuTreeBuilder;
export default _default;
//# sourceMappingURL=MenuTreeBuilder.d.ts.map