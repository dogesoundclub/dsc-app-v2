import { DomNode } from "@hanul/skynode";
declare class MenuTreeBuilder {
    build(menus: {
        uri: string;
        name: string;
        children?: {
            uri: string;
            name: string;
        }[];
    }[]): DomNode<HTMLElement>;
}
declare const _default: MenuTreeBuilder;
export default _default;
//# sourceMappingURL=MenuTreeBuilder.d.ts.map