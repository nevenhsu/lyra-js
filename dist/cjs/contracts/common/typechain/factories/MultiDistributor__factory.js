"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiDistributor__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "contract IERC20",
                name: "rewardToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "claimer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "epochTimestamp",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "tag",
                type: "string",
            },
        ],
        name: "ClaimAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "contract IERC20",
                name: "rewardToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "claimer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Claimed",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "contract IERC20[]",
                name: "tokens",
                type: "address[]",
            },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "contract IERC20",
                name: "",
                type: "address",
            },
        ],
        name: "claimableBalances",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var MultiDistributor__factory = /** @class */ (function () {
    function MultiDistributor__factory() {
    }
    MultiDistributor__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    MultiDistributor__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    MultiDistributor__factory.abi = _abi;
    return MultiDistributor__factory;
}());
exports.MultiDistributor__factory = MultiDistributor__factory;
//# sourceMappingURL=MultiDistributor__factory.js.map