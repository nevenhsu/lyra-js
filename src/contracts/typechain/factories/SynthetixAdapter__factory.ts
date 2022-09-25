/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  SynthetixAdapter,
  SynthetixAdapterInterface,
} from "../SynthetixAdapter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "AllMarketsPaused",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountQuoteRequested",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseToSpend",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "spotPrice",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "baseKey",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "quoteKey",
        type: "bytes32",
      },
    ],
    name: "BaseQuoteExchangeExceedsLimit",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "rewardAddress",
        type: "address",
      },
    ],
    name: "InvalidRewardAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "MarketIsPaused",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "nominatedOwner",
        type: "address",
      },
    ],
    name: "OnlyNominatedOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OnlyOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountBaseRequested",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quoteToSpend",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quoteLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "spotPrice",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "quoteKey",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "baseKey",
        type: "bytes32",
      },
    ],
    name: "QuoteBaseExchangeExceedsLimit",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "spotPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "invalid",
        type: "bool",
      },
    ],
    name: "RateIsInvalid",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "fromKey",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "toKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amountSwapped",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountReceived",
        type: "uint256",
      },
    ],
    name: "ReceivedZeroFromExchange",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IAddressResolver",
        name: "addressResolver",
        type: "address",
      },
    ],
    name: "AddressResolverSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "exchanger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseSwapped",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteReceived",
        type: "uint256",
      },
    ],
    name: "BaseSwappedForQuote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "isPaused",
        type: "bool",
      },
    ],
    name: "GlobalPausedSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "quoteKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "baseKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rewardAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "trackingCode",
        type: "bytes32",
      },
    ],
    name: "GlobalsSetForContract",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPaused",
        type: "bool",
      },
    ],
    name: "MarketPausedSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerNominated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "exchanger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteSwapped",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseReceived",
        type: "uint256",
      },
    ],
    name: "QuoteSwappedForBase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ISynthetix",
        name: "synthetix",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IExchanger",
        name: "exchanger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IExchangeRates",
        name: "exchangeRates",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IDelegateApprovals",
        name: "delegateApprovals",
        type: "address",
      },
    ],
    name: "SynthetixAddressesUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addressResolver",
    outputs: [
      {
        internalType: "contract IAddressResolver",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "baseKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "delegateApprovals",
    outputs: [
      {
        internalType: "contract IDelegateApprovals",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "spotPrice",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "quoteKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "baseKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "quoteBaseFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseQuoteFeeRate",
            type: "uint256",
          },
        ],
        internalType: "struct SynthetixAdapter.ExchangeParams",
        name: "exchangeParams",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "amountBase",
        type: "uint256",
      },
    ],
    name: "estimateExchangeToExactBase",
    outputs: [
      {
        internalType: "uint256",
        name: "quoteNeeded",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "spotPrice",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "quoteKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "baseKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "quoteBaseFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseQuoteFeeRate",
            type: "uint256",
          },
        ],
        internalType: "struct SynthetixAdapter.ExchangeParams",
        name: "exchangeParams",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "amountQuote",
        type: "uint256",
      },
    ],
    name: "estimateExchangeToExactQuote",
    outputs: [
      {
        internalType: "uint256",
        name: "baseNeeded",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "optionMarket",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountBase",
        type: "uint256",
      },
    ],
    name: "exchangeFromExactBase",
    outputs: [
      {
        internalType: "uint256",
        name: "quoteReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "optionMarket",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountQuote",
        type: "uint256",
      },
    ],
    name: "exchangeFromExactQuote",
    outputs: [
      {
        internalType: "uint256",
        name: "baseReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeRates",
    outputs: [
      {
        internalType: "contract IExchangeRates",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "spotPrice",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "quoteKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "baseKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "quoteBaseFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseQuoteFeeRate",
            type: "uint256",
          },
        ],
        internalType: "struct SynthetixAdapter.ExchangeParams",
        name: "exchangeParams",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "optionMarket",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountBase",
        type: "uint256",
      },
    ],
    name: "exchangeToExactBase",
    outputs: [
      {
        internalType: "uint256",
        name: "quoteSpent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "spotPrice",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "quoteKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "baseKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "quoteBaseFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseQuoteFeeRate",
            type: "uint256",
          },
        ],
        internalType: "struct SynthetixAdapter.ExchangeParams",
        name: "exchangeParams",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "optionMarket",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountBase",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quoteLimit",
        type: "uint256",
      },
    ],
    name: "exchangeToExactBaseWithLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "quoteSpent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "spotPrice",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "quoteKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "baseKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "quoteBaseFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseQuoteFeeRate",
            type: "uint256",
          },
        ],
        internalType: "struct SynthetixAdapter.ExchangeParams",
        name: "exchangeParams",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "optionMarket",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountQuote",
        type: "uint256",
      },
    ],
    name: "exchangeToExactQuote",
    outputs: [
      {
        internalType: "uint256",
        name: "quoteSpent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quoteReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "spotPrice",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "quoteKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "baseKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "quoteBaseFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseQuoteFeeRate",
            type: "uint256",
          },
        ],
        internalType: "struct SynthetixAdapter.ExchangeParams",
        name: "exchangeParams",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "optionMarket",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountQuote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseLimit",
        type: "uint256",
      },
    ],
    name: "exchangeToExactQuoteWithLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "baseSpent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quoteReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "exchanger",
    outputs: [
      {
        internalType: "contract IExchanger",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "optionMarket",
        type: "address",
      },
    ],
    name: "getExchangeParams",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "spotPrice",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "quoteKey",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "baseKey",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "quoteBaseFeeRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseQuoteFeeRate",
            type: "uint256",
          },
        ],
        internalType: "struct SynthetixAdapter.ExchangeParams",
        name: "exchangeParams",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "to",
        type: "bytes32",
      },
    ],
    name: "getSpotPrice",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "getSpotPriceForMarket",
    outputs: [
      {
        internalType: "uint256",
        name: "spotPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isGlobalPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isMarketPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "nominateNewOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nominatedOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "quoteKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAddressResolver",
        name: "_addressResolver",
        type: "address",
      },
    ],
    name: "setAddressResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_isPaused",
        type: "bool",
      },
    ],
    name: "setGlobalPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_quoteKey",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_baseKey",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_rewardAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_trackingCode",
        type: "bytes32",
      },
    ],
    name: "setGlobalsForContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isPaused",
        type: "bool",
      },
    ],
    name: "setMarketPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "synthetix",
    outputs: [
      {
        internalType: "contract ISynthetix",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "trackingCode",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "updateSynthetixAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class SynthetixAdapter__factory {
  static readonly abi = _abi;
  static createInterface(): SynthetixAdapterInterface {
    return new utils.Interface(_abi) as SynthetixAdapterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SynthetixAdapter {
    return new Contract(address, _abi, signerOrProvider) as SynthetixAdapter;
  }
}
