import Dialogue from "./Dialogue";

export default class Confirm extends Dialogue {

    constructor(message: string, confirmTitle: string, confirm: () => void) {
        super(".confirm", message, confirmTitle, confirm);
    }
}
