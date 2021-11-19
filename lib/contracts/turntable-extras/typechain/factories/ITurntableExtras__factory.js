"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITurntableExtras__factory = void 0;
const ethers_1 = require("ethers");
class ITurntableExtras__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ITurntableExtras__factory = ITurntableExtras__factory;
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
        ],
        name: "extras",
        outputs: [
            {
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "turntableId",
                type: "uint256",
            },
            {
                name: "extra",
                type: "string",
            },
        ],
        name: "set",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "turntableId",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                name: "extra",
                type: "string",
            },
        ],
        name: "Set",
        type: "event",
    },
];
//# sourceMappingURL=ITurntableExtras__factory.js.map