import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Wallet from "../../klaytn/Wallet";

export default class NodeSyncTest implements View {

    private container: DomNode;

    constructor() {
        BodyNode.append(this.container = el(".node-sync-test-view",
            "TEST!",
        ));

        const caver = new (window as any).Caver(new (window as any).Caver.providers.WebsocketProvider("wss://klaytn-node.dogesound.club:9091"));
        setInterval(async () => {
            const block = await caver.klay.getBlockNumber();
            console.log(block, block - await Wallet.loadBlockNumber());
        }, 1000);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
