"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const SloganContract_1 = __importDefault(require("../../contracts/SloganContract"));
const Rank_1 = __importDefault(require("./Rank"));
class RankList extends skynode_1.DomNode {
    constructor() {
        super(".dogesounds-rank-list");
        this.append((0, skynode_1.el)("table", (0, skynode_1.el)("thead", (0, skynode_1.el)("tr", (0, skynode_1.el)("th", "#", { width: "10%" }), (0, skynode_1.el)("th", "BLOCK #", { width: "20%" }), (0, skynode_1.el)("th", "VOTES", { width: "15%" }), (0, skynode_1.el)("th", "DOGESOUND", { width: "55%" }))), this.rankList = (0, skynode_1.el)("tbody")));
        this.loadMessages();
    }
    async loadMessages() {
        const round = (await SloganContract_1.default.getRound()).toNumber();
        skyutil_1.default.repeat(round, (index) => {
            this.rankList.append(new Rank_1.default(round - index - 1));
        });
    }
}
exports.default = RankList;
//# sourceMappingURL=RankList.js.map