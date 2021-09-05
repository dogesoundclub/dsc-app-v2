import { el } from "@hanul/skynode";
import Dialogue from "./Dialogue";

export default class Alert extends Dialogue {

    constructor(
        message: string,
        confirmTitle: string,
        confirm?: () => void,
    ) {
        super(".alert", message, confirmTitle, () => {
            if (confirm !== undefined) {
                confirm();
            }
        });
    }
}
