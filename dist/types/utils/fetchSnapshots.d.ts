import { DocumentNode } from '@apollo/client/core';
import Lyra from '..';
import { SnapshotOptions } from '../constants/snapshots';
export default function fetchSnapshots<Snapshot extends Record<string, any>, Variables extends Record<string, any>>(lyra: Lyra, query: DocumentNode, variables: Variables, options?: SnapshotOptions): Promise<Snapshot[]>;
