"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Contract_1 = __importDefault(require("./Contract"));
class AttributesContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.Attributes, require("./AttributesContractABI.json"));
    }
    async level(mateId) {
        return await this.contract.methods.level(mateId).call();
    }
    async face(mateId) {
        return await this.contract.methods.face(mateId).call();
    }
    async faceDetailA(mateId) {
        return await this.contract.methods.faceDetailA(mateId).call();
    }
    async faceDetailB(mateId) {
        return await this.contract.methods.faceDetailB(mateId).call();
    }
    async neck(mateId) {
        return await this.contract.methods.neck(mateId).call();
    }
    async mouth(mateId) {
        return await this.contract.methods.mouth(mateId).call();
    }
    async eyes(mateId) {
        return await this.contract.methods.eyes(mateId).call();
    }
    async forehead(mateId) {
        return await this.contract.methods.forehead(mateId).call();
    }
    async headwear(mateId) {
        return await this.contract.methods.headwear(mateId).call();
    }
    async headwearDetail(mateId) {
        return await this.contract.methods.headwearDetail(mateId).call();
    }
    async ears(mateId) {
        return await this.contract.methods.ears(mateId).call();
    }
    async items(mateId) {
        return await this.contract.methods.items(mateId).call();
    }
}
exports.default = new AttributesContract();
//# sourceMappingURL=AttributesContract.js.map