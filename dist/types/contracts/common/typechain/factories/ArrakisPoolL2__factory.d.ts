import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ArrakisPoolL2, ArrakisPoolL2Interface } from "../ArrakisPoolL2";
export declare class ArrakisPoolL2__factory {
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
    static createInterface(): ArrakisPoolL2Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ArrakisPoolL2;
}
