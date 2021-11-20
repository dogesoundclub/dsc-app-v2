import { View, ViewParams } from "skyrouter";
export default class Detail implements View {
    private container;
    private title;
    private infoDisplay;
    private controller;
    private listeningMateList;
    private myMateList;
    private klayMixInfo;
    private kspMixInfo;
    constructor(params: ViewParams);
    private load;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Detail.d.ts.map