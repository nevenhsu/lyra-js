import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { LyraStakingModuleProxy, LyraStakingModuleProxyInterface } from "../LyraStakingModuleProxy";
export declare class LyraStakingModuleProxy__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): LyraStakingModuleProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LyraStakingModuleProxy;
}
