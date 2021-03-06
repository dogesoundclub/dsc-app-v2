"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurntableExtras__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class TurntableExtras__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_turntables, overrides) {
        return super.deploy(_turntables, overrides || {});
    }
    getDeployTransaction(_turntables, overrides) {
        return super.getDeployTransaction(_turntables, overrides || {});
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
exports.TurntableExtras__factory = TurntableExtras__factory;
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "turntables",
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
        inputs: [
            {
                name: "",
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
        inputs: [
            {
                name: "_turntables",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405160208061059f8339810180604052602081101561003057600080fd5b8101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061050e806100916000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806320ff98ba146100465780635468bc2f146100905780636437197714610137575b600080fd5b61004e6101ba565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100bc600480360360208110156100a657600080fd5b81019080803590602001909291905050506101df565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100fc5780820151818401526020810190506100e1565b50505050905090810190601f1680156101295780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101b86004803603604081101561014d57600080fd5b81019080803590602001909291908035906020019064010000000081111561017457600080fd5b82018360208201111561018657600080fd5b803590602001918460018302840111640100000000831117156101a857600080fd5b909192939192939050505061028f565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016020528060005260406000206000915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102875780601f1061025c57610100808354040283529160200191610287565b820191906000526020600020905b81548152906001019060200180831161026a57829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e8c06611856040518263ffffffff1660e01b81526004018082815260200191505060806040518083038186803b15801561030357600080fd5b505afa158015610317573d6000803e3d6000fd5b505050506040513d608081101561032d57600080fd5b810190808051906020019092919080519060200190929190805190602001909291908051906020019092919050505050505090503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461039957600080fd5b82826001600087815260200190815260200160002091906103bb92919061043d565b503373ffffffffffffffffffffffffffffffffffffffff16847f1cb652ada0cb03a6f21d190633f306aec0dda3a51c14eb77766ae47a85f7a5be858560405180806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050935050505060405180910390a350505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061047e57803560ff19168380011785556104ac565b828001600101855582156104ac579182015b828111156104ab578235825591602001919060010190610490565b5b5090506104b991906104bd565b5090565b6104df91905b808211156104db5760008160009055506001016104c3565b5090565b9056fea165627a7a723058203cbd2b2f74a3300ffc8e9bebbe776b412d33636264a3a5cd1cd2ee12c03e42630029";
//# sourceMappingURL=TurntableExtras__factory.js.map