"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const chart_js_1 = require("chart.js");
const msg_js_1 = __importDefault(require("msg.js"));
const skyutil_1 = __importDefault(require("skyutil"));
const MixEmitterContract_1 = __importDefault(require("../contracts/mix/MixEmitterContract"));
const Layout_1 = __importDefault(require("./Layout"));
const pools_json_1 = __importDefault(require("../pools.json"));
class Mix {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("MIX_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mix-view", (0, skynode_1.el)("h1", (0, msg_js_1.default)("MIX_TITLE")), (0, skynode_1.el)("img", { src: "/images/view/mix/logo.png", height: "150" }), (0, skynode_1.el)("p", "MIX는 NFT 프로젝트들의 허브를 위한 토큰입니다. DSC 사이트의 전 범위에서 사용되며, Klayswap에서 유동성 공급 및 거래에 사용될 예정입니다. 또한 MIX를 활용한 기능을 추가하기로 약속한 파트너 프로젝트의 서비스에서도 사용될 예정입니다."), (0, skynode_1.el)("a", "MIX 백서 보기", { href: "https://medium.com/dogesoundclub/dsc-mix-nft-%ED%97%88%EB%B8%8C%EB%A5%BC-%EC%9C%84%ED%95%9C-%ED%86%A0%ED%81%B0-3299dd3a8d1d", target: "_blank" }), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "풀 정보"), this.poolContainer = (0, skynode_1.el)("canvas")), (0, skynode_1.el)("section", (0, skynode_1.el)("h2", "풀 설명"), (0, skynode_1.el)("h3", "메이트 풀"), (0, skynode_1.el)("p", "메이트 홀더들은 DSC 커뮤니티의 가장 적극적인 사용자들로, 메이트를 보유하고 있으면 MIX를 분배받게 됩니다. 메이트 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다."), (0, skynode_1.el)("h3", "OGs 풀"), (0, skynode_1.el)("p", "OG 홀더들은 DSC 커뮤니티의 가장 적극적인 사용자들로, OG를 보유하고 있으면 MIX를 분배받게 됩니다. OG 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다. 이를 통해 MIX의 유통량이 늘어납니다."), (0, skynode_1.el)("h3", "Klayswap 유동성 풀"), (0, skynode_1.el)("p", "Klayswap의 유동성 풀에 발행량 중 일부를 할당합니다. 이를 통해 Klayswap 내 MIX 풀의 APR을 상승시켜, MIX 토큰이 더 큰 유동성을 갖도록 만듭니다. 풀은 Klay-MIX LP 및 KSP-MIX LP, 두 가지가 있습니다."), (0, skynode_1.el)("h3", "턴테이블"), (0, skynode_1.el)("p", "턴테이블은 MIX를 중~장기로 스테이킹하고자 하는 사용자들을 위한 시스템입니다. 사용자들은 사이트 내에서 MIX로 턴테이블을 구매할 수 있으며, 턴테이블의 “볼륨”에 따라 MIX를 분배받는 비율이 결정됩니다. 턴테이블의 등급에 따라 가격과 볼륨이 다르며, 턴테이블에는 배터리가 존재합니다. 배터리가 모두 소모된 턴테이블은 다시 MIX를 통해 배터리를 충전해야 지속적으로 MIX를 얻을 수 있습니다. 턴테이블은 분해가 가능하며, 분해하면 조립시 사용된 MIX의 80%를 돌려받습니다."), (0, skynode_1.el)("h3", "리스너"), (0, skynode_1.el)("p", "NFT 홀더들의 경우, 본인의 NFT를 턴테이블에 등록하면 해당 턴테이블의 리스너가 되어 추가적인 MIX를 받을 수 있습니다.\nKlayswap 유동성 풀 사용자들의 경우, 턴테이블에 LP 토큰을 예치하면 마찬가지로 리스너가 되어 추가적인 MIX를 받을 수 있습니다.\n리스너에게 할당된 MIX는 턴테이블 소유주에게 30%가, NFT 및 LP 토큰 홀더들에게 70%를 분배됩니다.\n리스너 시스템을 통해 턴테이블 소유자들은 리스너를 유치하기 위해 노력할 것입니다."), (0, skynode_1.el)("h3", "Dev Fund"), (0, skynode_1.el)("p", "개발 펀드는 개발 및 마케팅 등 MIX의 활용처를 늘리고 주어진 목표를 달성하는 책임을 이행할 수 있도록 합니다."))));
        this.loadPools();
    }
    async loadPools() {
        const chartData = {
            labels: [],
            datasets: [{
                    data: [],
                    backgroundColor: [],
                }],
        };
        const poolCount = (await MixEmitterContract_1.default.poolCount()).toNumber();
        await skyutil_1.default.repeatResultAsync(poolCount, async (pid) => {
            const poolInfo = await MixEmitterContract_1.default.poolInfo(pid);
            const pool = pools_json_1.default[poolInfo.to];
            if (pool === undefined) {
                chartData.labels.push("Unknown");
                chartData.datasets[0].data.push(poolInfo.allocPoint.toNumber() / 100);
                chartData.datasets[0].backgroundColor.push("#333333");
            }
            else {
                chartData.labels.push(pool.name);
                chartData.datasets[0].data.push(poolInfo.allocPoint.toNumber() / 100);
                chartData.datasets[0].backgroundColor.push(pool.color);
            }
        });
        chart_js_1.Chart.register(...chart_js_1.registerables);
        new chart_js_1.Chart(this.poolContainer.domElement.getContext("2d"), {
            type: "pie",
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            },
        });
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Mix;
//# sourceMappingURL=Mix.js.map