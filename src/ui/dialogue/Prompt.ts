import Dialogue from "./Dialogue";

export default class Prompt extends Dialogue {

    constructor(message: string, confirmTitle: string, confirm: () => void) {
        super(".prompt", message, confirmTitle, confirm);
    }
}
