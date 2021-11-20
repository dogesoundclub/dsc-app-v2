"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const TurntableExtrasContract_1 = __importDefault(require("../../contracts/turntable/TurntableExtrasContract"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Update {
    constructor(params) {
        const turntableId = parseInt(params.id, 10);
        Layout_1.default.current.title = "턴테이블 정보 수정";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".update-turntable-view", (0, skynode_1.el)("h1", "턴테이블 정보 수정"), (0, skynode_1.el)("a.back-button", "< 뒤로가기", {
            click: () => ViewUtil_1.default.go(`/turntable/${turntableId}`),
        }), (0, skynode_1.el)(".form", (0, skynode_1.el)("label", (0, skynode_1.el)("h4", "턴테이블 이름"), this.nameInput = (0, skynode_1.el)("input", { placeholder: "턴테이블 이름" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h4", "턴테이블 설명"), this.descriptionTextarea = (0, skynode_1.el)("textarea", { placeholder: "턴테이블 설명" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h4", "BGM 유튜브 링크"), this.bgmInput = (0, skynode_1.el)("input", { placeholder: "BGM 유튜브 링크" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h4", "관련 트위터"), this.twitterInput = (0, skynode_1.el)("input", { type: "url", placeholder: "관련 트위터" })), (0, skynode_1.el)("label", (0, skynode_1.el)("h4", "관련 카카오톡 오픈 채팅방"), this.kakaotalkInput = (0, skynode_1.el)("input", { type: "url", placeholder: "관련 카카오톡 오픈 채팅방" })), (0, skynode_1.el)("a.save-button", "저장하기", {
            click: async () => {
                const extra = {
                    name: this.nameInput.domElement.value,
                    description: this.descriptionTextarea.domElement.value,
                    bgm: this.bgmInput.domElement.value,
                    twitter: this.twitterInput.domElement.value,
                    kakaotalk: this.kakaotalkInput.domElement.value,
                };
                await TurntableExtrasContract_1.default.set(turntableId, JSON.stringify(extra));
                setTimeout(() => ViewUtil_1.default.go(`/turntable/${turntableId}`), 2000);
            },
        }))));
        this.load(turntableId);
    }
    async load(turntableId) {
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Update;
//# sourceMappingURL=Update.js.map