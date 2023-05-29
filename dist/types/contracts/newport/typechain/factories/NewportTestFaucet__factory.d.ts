import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { NewportTestFaucet, NewportTestFaucetInterface } from "../NewportTestFaucet";
export declare class NewportTestFaucet__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): NewportTestFaucetInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): NewportTestFaucet;
}
