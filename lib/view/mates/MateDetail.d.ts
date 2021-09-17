import { View, ViewParams } from "skyrouter";
export default class MateDetail implements View {
    private id;
    private container;
    private nameDisplay;
    private snsDisplay;
    private messagesTitle;
    constructor(params: ViewParams);
    private load;
    private loadSNS;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=MateDetail.d.ts.map