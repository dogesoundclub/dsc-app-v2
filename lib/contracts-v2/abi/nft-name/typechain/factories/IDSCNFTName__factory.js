"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDSCNFTName__factory = void 0;
const ethers_1 = require("ethers");
class IDSCNFTName__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IDSCNFTName__factory = IDSCNFTName__factory;
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "mixForChanging",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "name",
                type: "string",
            },
        ],
        name: "exists",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "V1",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "mixForDeleting",
        outputs: [
            {
                name: "",
                type: "uint256",
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
                name: "nft",
                type: "address",
            },
            {
                name: "mateId",
                type: "uint256",
            },
        ],
        name: "remove",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "nft",
                type: "address",
            },
            {
                name: "mateId",
                type: "uint256",
            },
        ],
        name: "named",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "nft",
                type: "address",
            },
            {
                name: "mateId",
                type: "uint256",
            },
        ],
        name: "names",
        outputs: [
            {
                name: "name",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "mix",
        outputs: [
            {
                name: "",
                type: "address",
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
                name: "nft",
                type: "address",
            },
            {
                name: "mateId",
                type: "uint256",
            },
            {
                name: "name",
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
                indexed: false,
                name: "_mix",
                type: "uint256",
            },
        ],
        name: "SetMixForChanging",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "_mix",
                type: "uint256",
            },
        ],
        name: "SetMixForDeleting",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "nft",
                type: "address",
            },
            {
                indexed: true,
                name: "mateId",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                name: "name",
                type: "string",
            },
        ],
        name: "Set",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "nft",
                type: "address",
            },
            {
                indexed: true,
                name: "mateId",
                type: "uint256",
            },
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
        ],
        name: "Remove",
        type: "event",
    },
];
//# sourceMappingURL=IDSCNFTName__factory.js.map