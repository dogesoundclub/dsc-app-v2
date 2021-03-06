"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateCountTransfer__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class MateCountTransfer__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_mate, overrides) {
        return super.deploy(_mate, overrides || {});
    }
    getDeployTransaction(_mate, overrides) {
        return super.getDeployTransaction(_mate, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MateCountTransfer__factory = MateCountTransfer__factory;
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "mate",
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
                name: "to",
                type: "address",
            },
            {
                name: "start",
                type: "uint256",
            },
            {
                name: "count",
                type: "uint256",
            },
        ],
        name: "countTransfer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                name: "_mate",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506040516020806105278339810180604052602081101561003057600080fd5b8101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610496806100916000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80630a5cc93d1461003b5780635a06df8214610085575b600080fd5b6100436100dd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100db6004803603606081101561009b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610102565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561016b57600080fd5b505afa15801561017f573d6000803e3d6000fd5b505050506040513d602081101561019557600080fd5b81019080805190602001909291905050509050600080905060008490505b828110156103ce573373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561024457600080fd5b505afa158015610258573d6000803e3d6000fd5b505050506040513d602081101561026e57600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614156103b3576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3388846040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b15801561037757600080fd5b505af115801561038b573d6000803e3d6000fd5b505050506103a36001836103e290919063ffffffff16565b9150838214156103b2576103ce565b5b6103c76001826103e290919063ffffffff16565b90506101b3565b508281146103db57600080fd5b5050505050565b600080828401905083811015610460576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b809150509291505056fea165627a7a7230582031c3de11c0a83372884525ffa5b278d0afb612888506693738d883b5ad32dc1e0029";
//# sourceMappingURL=MateCountTransfer__factory.js.map