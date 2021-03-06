"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSCNFTName__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class DSCNFTName__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_mix, overrides) {
        return super.deploy(_mix, overrides || {});
    }
    getDeployTransaction(_mix, overrides) {
        return super.getDeployTransaction(_mix, overrides || {});
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
exports.DSCNFTName__factory = DSCNFTName__factory;
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
        constant: false,
        inputs: [
            {
                name: "_mix",
                type: "uint256",
            },
        ],
        name: "setMixForChanging",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
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
            {
                name: "name",
                type: "string",
            },
        ],
        name: "importFromV1",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
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
        name: "isOwner",
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
        constant: false,
        inputs: [
            {
                name: "_mix",
                type: "uint256",
            },
        ],
        name: "setMixForDeleting",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "",
                type: "address",
            },
            {
                name: "",
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
                name: "",
                type: "address",
            },
            {
                name: "",
                type: "uint256",
            },
        ],
        name: "names",
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
        constant: true,
        inputs: [
            {
                name: "",
                type: "string",
            },
        ],
        name: "_exists",
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
        constant: false,
        inputs: [
            {
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                name: "_mix",
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
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
];
const _bytecode = "0x608060405268056bc75e2d63100000600255680ad78ebc5ac620000060035534801561002a57600080fd5b50604051602080611c3e8339810180604052602081101561004a57600080fd5b8101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050611ad6806101686000396000f3fe608060405234801561001057600080fd5b506004361061010a5760003560e01c80638f32d59b116100a2578063b914d7ab11610071578063b914d7ab1461044f578063be32cf8d14610516578063cc30aa8014610560578063e8d632f714610633578063f2fde38b146106d65761010a565b80638f32d59b1461034b578063abe7f1ab1461036d578063b1b0e9e2146103bb578063b4b94bd1146103e95761010a565b806351d5fa05116100de57806351d5fa05146102365780635f5921a014610254578063715018a6146102f75780638da5cb5b146103015761010a565b8062e421151461010f578063261a323e1461012d57806332b09d8a146101be5780633ee569bf146101ec575b600080fd5b61011761071a565b6040518082815260200191505060405180910390f35b6101a46004803603602081101561014357600080fd5b810190808035906020019064010000000081111561016057600080fd5b82018360208201111561017257600080fd5b8035906020019184600183028401116401000000008311171561019457600080fd5b9091929391929390505050610720565b604051808215151515815260200191505060405180910390f35b6101ea600480360360208110156101d457600080fd5b810190808035906020019092919050505061075f565b005b6101f461081a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61023e610832565b6040518082815260200191505060405180910390f35b6102f56004803603606081101561026a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156102b157600080fd5b8201836020820111156102c357600080fd5b803590602001918460018302840111640100000000831117156102e557600080fd5b9091929391929390505050610838565b005b6102ff610be2565b005b610309610d1b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610353610d44565b604051808215151515815260200191505060405180910390f35b6103b96004803603604081101561038357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d9b565b005b6103e7600480360360208110156103d157600080fd5b8101908080359060200190929190505050611110565b005b610435600480360360408110156103ff57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506111cb565b604051808215151515815260200191505060405180910390f35b61049b6004803603604081101561046557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506111fa565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104db5780820151818401526020810190506104c0565b50505050905090810190601f1680156105085780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61051e6112b7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6106196004803603602081101561057657600080fd5b810190808035906020019064010000000081111561059357600080fd5b8201836020820111156105a557600080fd5b803590602001918460018302840111640100000000831117156105c757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506112dd565b604051808215151515815260200191505060405180910390f35b6106d46004803603606081101561064957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561069057600080fd5b8201836020820111156106a257600080fd5b803590602001918460018302840111640100000000831117156106c457600080fd5b9091929391929390505050611313565b005b610718600480360360208110156106ec57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506117cd565b005b60025481565b600060068383604051808383808284378083019250505092505050908152602001604051809103902060009054906101000a900460ff16905092915050565b610767610d44565b6107d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b806002819055507fc525656b438b9b2d5c4f6e6c49accf903c31889f083c67eaba3ea0230f49b461816040518082815260200191505060405180910390a150565b7312c591fcd89b83704541b1eac6b4aa18063a695481565b60035481565b610840610d44565b6108b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6001151560068383604051808383808284378083019250505092505050908152602001604051809103902060009054906101000a900460ff16151514156108f857600080fd5b60011515600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900460ff1615151415610a405760006006600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008681526020019081526020016000206040518082805460018160011615610100020316600290048015610a115780601f106109ef576101008083540402835291820191610a11565b820191906000526020600020905b8154815290600101906020018083116109fd575b5050915050908152602001604051809103902060006101000a81548160ff021916908315150217905550610aaa565b6001600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060006101000a81548160ff0219169083151502179055505b8181600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008681526020019081526020016000209190610b09929190611997565b50600160068383604051808383808284378083019250505092505050908152602001604051809103902060006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff16838573ffffffffffffffffffffffffffffffffffffffff167fd6a0ea4a47ba4c9feb5e1926c0b8b54ed5d0d1c3f82db9e97e88fcb00380b563858560405180806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050935050505060405180910390a450505050565b610bea610d44565b610c5c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b81813373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015610e0557600080fd5b505afa158015610e19573d6000803e3d6000fd5b505050506040513d6020811015610e2f57600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614610e6057600080fd5b6006600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206040518082805460018160011615610100020316600290048015610f0d5780601f10610eeb576101008083540402835291820191610f0d565b820191906000526020600020905b815481529060010190602001808311610ef9575b5050915050908152602001604051809103902060006101000a81549060ff0219169055600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000206000610f8c9190611a17565b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060006101000a81549060ff0219169055600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166379cc6790336003546040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561109757600080fd5b505af11580156110ab573d6000803e3d6000fd5b505050503373ffffffffffffffffffffffffffffffffffffffff16838573ffffffffffffffffffffffffffffffffffffffff167f7542313346b3888a4934b60753950aedbbd0d559c467d427080ef86ebc49fec760405160405180910390a450505050565b611118610d44565b61118a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b806003819055507f8ac2882dbe0d04ffe357445bbd75279794ffa50a20d2dd780afd58a672692636816040518082815260200191505060405180910390a150565b60056020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b6004602052816000526040600020602052806000526040600020600091509150508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112af5780601f10611284576101008083540402835291602001916112af565b820191906000526020600020905b81548152906001019060200180831161129257829003601f168201915b505050505081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6006818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b83833373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561137d57600080fd5b505afa158015611391573d6000803e3d6000fd5b505050506040513d60208110156113a757600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff16146113d857600080fd5b6001151560068585604051808383808284378083019250505092505050908152602001604051809103902060009054906101000a900460ff161515141561141e57600080fd5b60011515600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060009054906101000a900460ff16151514156116295760006006600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002060405180828054600181600116156101000203166002900480156115375780601f10611515576101008083540402835291820191611537565b820191906000526020600020905b815481529060010190602001808311611523575b5050915050908152602001604051809103902060006101000a81548160ff021916908315150217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166379cc6790336002546040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561160c57600080fd5b505af1158015611620573d6000803e3d6000fd5b50505050611693565b6001600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060006101000a81548160ff0219169083151502179055505b8383600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002091906116f2929190611997565b50600160068585604051808383808284378083019250505092505050908152602001604051809103902060006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff16858773ffffffffffffffffffffffffffffffffffffffff167fd6a0ea4a47ba4c9feb5e1926c0b8b54ed5d0d1c3f82db9e97e88fcb00380b563878760405180806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050935050505060405180910390a4505050505050565b6117d5610d44565b611847576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b61185081611853565b50565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156118d9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180611a856026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106119d857803560ff1916838001178555611a06565b82800160010185558215611a06579182015b82811115611a055782358255916020019190600101906119ea565b5b509050611a139190611a5f565b5090565b50805460018160011615610100020316600290046000825580601f10611a3d5750611a5c565b601f016020900490600052602060002090810190611a5b9190611a5f565b5b50565b611a8191905b80821115611a7d576000816000905550600101611a65565b5090565b9056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a165627a7a7230582048d05d25cb4e71c0d04915dd71e6dce8c037842268c59f750d3e2330f5914e260029";
//# sourceMappingURL=DSCNFTName__factory.js.map