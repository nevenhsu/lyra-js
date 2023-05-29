import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { AvalonTestFaucet, AvalonTestFaucetInterface } from "../AvalonTestFaucet";
export declare class AvalonTestFaucet__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): AvalonTestFaucetInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AvalonTestFaucet;
}
