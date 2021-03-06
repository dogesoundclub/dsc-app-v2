"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context__factory = void 0;
const ethers_1 = require("ethers");
class Context__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.Context__factory = Context__factory;
const _abi = [
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
];
//# sourceMappingURL=Context__factory.js.map