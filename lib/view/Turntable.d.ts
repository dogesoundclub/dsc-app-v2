import { View, ViewParams } from "skyrouter";
export default class Turntable implements View {
    private container;
    private myTurntableList;
    private listeningTurntableList;
    private totalVolumeDisplay;
    private totalTurntableList;
    constructor();
    private loadTotalVolume;
    private loadTurntables;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Turntable.d.ts.map