import { DomNode, el } from "@hanul/skynode";
import { Chart, registerables } from "chart.js";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import SkyUtil from "skyutil";
import MixEmitterContract from "../contracts/mix/MixEmitterContract";
import pools from "../pools.json";
import Layout from "./Layout";

export default class Mix implements View {

    private container: DomNode;
    private poolContainer: DomNode<HTMLCanvasElement>;

    constructor() {
        Layout.current.title = msg("MIX_TITLE");
        Layout.current.content.append(this.container = el(".mix-view",
            el("h1", msg("MIX_TITLE")),
            el("img", { src: "/images/logo/mix.png", height: "200" }),
            el("p", "MIX는 NFT 프로젝트들의 허브를 위한 토큰입니다. DSC 사이트의 전 범위에서 사용되며, Klayswap에서 유동성 공급 및 거래에 사용될 예정입니다. 또한 MIX를 활용한 기능을 추가하기로 약속한 파트너 프로젝트의 서비스에서도 사용될 예정입니다."),
            el("a", "MIX 백서 보기", { href: "https://medium.com/dogesoundclub/dsc-mix-nft-%ED%97%88%EB%B8%8C%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%86%A0%ED%81%B0-3299dd3a8d1d", target: "_blank" }),
            el("section",
                el("h2", "풀 정보"),
                this.poolContainer = el("canvas"),
            ),
            el("section",
                el("h2", "풀 설명"),

                el("h3", "메이트 풀"),
                el("p", "메이트 홀더들은 DSC 커뮤니티의 가장 적극적인 사용자들로, 메이트를 보유하고 있으면 MIX를 분배받게 됩니다. 메이트 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다."),

                el("h3", "OGs 풀"),
                el("p", "OG 홀더들은 DSC 커뮤니티의 가장 적극적인 사용자들로, OG를 보유하고 있으면 MIX를 분배받게 됩니다. OG 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다."),

                //el("h3", "Cases by Kate 풀"),
                //el("p", "Cases by Kate는 국내 최초 텍스트 기반 스토리텔링 NFT로써, DSC의 가장 가까운 파트너입니다. MIX를 활용하는 기능들을 지속적으로 추가할 예정입니다. 인출 방식은 메이트/OGs와 동일합니다."),

                el("h3", "Klayswap 유동성 풀"),
                el("p", "Klayswap의 유동성 풀에 발행량 중 일부를 할당합니다. 이를 통해 Klayswap 내 MIX 풀의 APR을 상승시켜, MIX 토큰이 더 큰 유동성을 갖도록 만듭니다. 풀은 Klay-MIX LP 및 KSP-MIX LP, 두 가지가 있습니다."),

                el("h3", "턴테이블"),
                el("p", "턴테이블은 MIX를 중~장기로 스테이킹하고자 하는 사용자들을 위한 시스템입니다. 사용자들은 사이트 내에서 MIX로 턴테이블을 구매할 수 있으며, 턴테이블의 “볼륨”에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."),

                el("h3", "리스너"),
                el("p", "NFT 홀더들의 경우, 본인의 NFT를 턴테이블에 등록하면 해당 턴테이블의 리스너가 되어 추가적인 MIX를 받을 수 있습니다.\nKlayswap 유동성 풀 사용자들의 경우, 턴테이블에 LP 토큰을 예치하면 마찬가지로 리스너가 되어 추가적인 MIX를 받을 수 있습니다.\n리스너에게 할당된 MIX는 턴테이블 소유주에게 30%가, NFT 및 LP 토큰 홀더들에게 70%를 분배됩니다.\n리스너 시스템을 통해 턴테이블 소유자들은 리스너를 유치하기 위해 노력할 것입니다."),

                el("h3", "Dev Fund"),
                el("p", "개발 펀드는 개발 및 마케팅 등 MIX의 활용처를 늘리고 주어진 목표를 달성하는 책임을 이행할 수 있도록 합니다."),
            ),
        ));
        this.loadPools();
    }

    private async loadPools() {

        const chartData: any = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
            }],
        };

        const poolCount = (await MixEmitterContract.poolCount()).toNumber();
        await SkyUtil.repeatResultAsync(poolCount, async (pid) => {
            const poolInfo = await MixEmitterContract.poolInfo(pid);
            const pool = (pools as any)[poolInfo.to];
            if (pool === undefined) {
                chartData.labels.push("Unknown");
                chartData.datasets[0].data.push(poolInfo.allocPoint.toNumber() / 100);
                chartData.datasets[0].backgroundColor.push("#333333");
            } else {
                chartData.labels.push(pool.name);
                chartData.datasets[0].data.push(poolInfo.allocPoint.toNumber() / 100);
                chartData.datasets[0].backgroundColor.push(pool.color);
            }
        });

        Chart.register(...registerables);
        new Chart(this.poolContainer.domElement.getContext("2d"), {
            type: "pie",
            data: chartData,
            options: {
                responsive: true,
                color: "#ffffff",
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            },
        });
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
