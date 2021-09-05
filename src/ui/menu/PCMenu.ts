import { DomNode } from "@hanul/skynode";
import LanguageSelect from "./LanguageSelect";
import menu from "./menu.json";
import MenuTreeBuilder from "./MenuTreeBuilder";

export default class PCMenu extends DomNode {

    constructor() {
        super(".pc-menu");
        this.append(
            MenuTreeBuilder.build(menu.menu),
            new LanguageSelect(),
        );
    }
}
