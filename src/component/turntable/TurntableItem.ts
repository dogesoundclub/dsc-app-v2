import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import TurntableExtrasContract from "../../contracts/turntable/TurntableExtrasContract";
import TurntablesContract, { TurntableInfo } from "../../contracts/turntable/TurntablesContract";
import turntables from "../../turntables.json";
import ViewUtil from "../../view/ViewUtil";

export default class TurntableItem extends DomNode {

    private nameDisplay: DomNode;
    private claimableDisplay: DomNode | undefined;

    constructor(private id: number, currentBlock: number, info: TurntableInfo, showMix?: boolean) {
        super(".turntable-item");
        const lifetime = info.endBlock - currentBlock;
        this.append(
            this.nameDisplay = el("h4", `턴테이블 #${id}`, { style: { color: turntables[info.typeId].color } }),
            el("img", { src: turntables[info.typeId].img }),
            el(".owner", `소유자: ${CommonUtil.shortenAddress(info.owner)}`),
            showMix !== true ? undefined : this.claimableDisplay = el(".mix", "Loading..."),
            el(".lifetime", `Lifetime: ${CommonUtil.numberWithCommas(String(lifetime < 0 ? 0 : lifetime))} Blocks`),
        );
        if (showMix === true) {
            this.loadClaimable();
        }
        this.onDom("click", () => ViewUtil.go(`/turntable/${id}`));
        this.loadInfo();
    }

    private async loadInfo() {
        const extra = await TurntableExtrasContract.extras(this.id);
        let data: any = {};
        try { data = JSON.parse(extra); } catch (e) { console.error(e); }
        if (data.name !== undefined) {
            this.nameDisplay.empty().appendText(data.name);
        }
    }

    private async loadClaimable() {
        const claimable = await TurntablesContract.claimableOf(this.id);
        this.claimableDisplay?.empty().appendText(
            `쌓인 MIX: ${CommonUtil.numberWithCommas(utils.formatEther(claimable), 5)}`,
        );
    }
}
