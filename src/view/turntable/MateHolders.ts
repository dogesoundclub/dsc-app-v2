import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Loading from "../../component/loading/Loading";
import MateContract from "../../contracts/nft/MateContract";
import MatesListenersContract from "../../contracts/turntable/MatesListenersContract";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class MateHolders implements View {

    private container: DomNode;

    private list: DomNode;

    constructor(params: ViewParams) {
        const turntableId = parseInt(params.id, 10);
        Layout.current.title = "턴테이블의 메이트 홀더들";
        Layout.current.content.append(this.container = el(".turntable-mate-holders-view",
            el("h1", "턴테이블의 메이트 홀더들"),
            el("a.back-button", "< 뒤로가기", {
                click: () => ViewUtil.go(`/turntable/${turntableId}`),
            }),
            el("table",
                el("thead",
                    el("tr",
                        el("th", "홀더 주소"),
                        el("th", "리스너로 등록한 메이트 개수"),
                    ),
                ),
                this.list = el("tbody.mate-list", new Loading()),
            ),
        ));

        this.load(turntableId);
    }

    private async load(turntableId: number) {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {

            const mateBalance = (await MatesListenersContract.listenerCount(turntableId)).toNumber();

            const holders: { [address: string]: number } = {};
            const promises: Promise<void>[] = [];
            for (let i = 0; i < mateBalance; i += 1) {
                const promise = async (index: number) => {
                    const mateId = (await MatesListenersContract.listeners(turntableId, index)).toNumber();
                    const owner = await MateContract.ownerOf(mateId);
                    if (holders[owner] === undefined) {
                        holders[owner] = 1;
                    } else {
                        holders[owner] += 1;
                    }
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            this.list.empty();

            const entries = Object.entries(holders);
            entries.sort((a, b) => b[1] - a[1]);
            for (const [holder, mates] of entries) {
                this.list.append(
                    el("tr.holder-item",
                        el("td.holder", holder),
                        el("td.mates", String(mates)),
                    ),
                );
            }

        } else {
            this.list.empty();
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
