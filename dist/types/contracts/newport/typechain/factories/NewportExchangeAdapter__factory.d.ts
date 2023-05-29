import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { NewportExchangeAdapter, NewportExchangeAdapterInterface } from "../NewportExchangeAdapter";
export declare class NewportExchangeAdapter__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): NewportExchangeAdapterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): NewportExchangeAdapter;
}
