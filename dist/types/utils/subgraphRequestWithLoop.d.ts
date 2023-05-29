import { DocumentNode } from '@apollo/client/core';
import Lyra from '..';
type IteratorVariables = {
    min: number;
    max: number;
    limit?: number;
};
export default function subgraphRequestWithLoop<Snapshot extends Record<string, any>, Variables extends Record<string, any> = Record<string, any>>(lyra: Lyra, query: DocumentNode, variables: Variables & IteratorVariables, iteratorKey: keyof Snapshot, batchOptions?: {
    increment: number;
    batch: number;
}): Promise<Snapshot[]>;
export {};
