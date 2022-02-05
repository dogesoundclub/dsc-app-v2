"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KlipSigner_json_1 = __importDefault(require("./abi/klip-signer/artifacts/contracts/KlipSigner.sol/KlipSigner.json"));
const Contract_1 = __importDefault(require("./Contract"));
class KlipSignerContract extends Contract_1.default {
    constructor() {
        super("0xAc2d108a066f3cf4a77A006B8B459199E51a611c", KlipSigner_json_1.default.abi);
    }
    async signedKeys(key) {
        return await this.runMethod("signedKeys", key);
    }
    async sign(key) {
        await this.runWalletMethod("sign", key);
    }
}
exports.default = new KlipSignerContract();
//# sourceMappingURL=KlipSignerContract.js.map