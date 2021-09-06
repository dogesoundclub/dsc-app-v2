import { View, ViewParams } from "skyrouter";
export default class MateDetail implements View {
    private id;
    private container;
    private nameDisplay;
    private messagesTitle;
    private transferButton;
    private nameInput;
    private nameTermCheckbox;
    private messageInput;
    private messageTermCheckbox;
    constructor(params: ViewParams);
    private loadName;
    private loadOnChainData;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=MateDetail.d.ts.map