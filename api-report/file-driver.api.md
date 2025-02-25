## API Report File for "@fluidframework/file-driver"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as api from '@fluidframework/protocol-definitions';
import * as api_2 from '@fluidframework/driver-definitions';
import { ConnectionMode } from '@fluidframework/protocol-definitions';
import { IClient } from '@fluidframework/protocol-definitions';
import { IClientConfiguration } from '@fluidframework/protocol-definitions';
import { IConnected } from '@fluidframework/protocol-definitions';
import { IDisposable } from '@fluidframework/common-definitions';
import { IDocumentDeltaConnection } from '@fluidframework/driver-definitions';
import { IDocumentDeltaConnectionEvents } from '@fluidframework/driver-definitions';
import { IDocumentDeltaStorageService } from '@fluidframework/driver-definitions';
import { IDocumentMessage } from '@fluidframework/protocol-definitions';
import { IDocumentService } from '@fluidframework/driver-definitions';
import { IDocumentServiceFactory } from '@fluidframework/driver-definitions';
import { IDocumentStorageService } from '@fluidframework/driver-definitions';
import { IDocumentStorageServicePolicies } from '@fluidframework/driver-definitions';
import { IFileSnapshot } from '@fluidframework/replay-driver';
import { IResolvedUrl } from '@fluidframework/driver-definitions';
import { ISequencedDocumentMessage } from '@fluidframework/protocol-definitions';
import { ISignalClient } from '@fluidframework/protocol-definitions';
import { ISignalMessage } from '@fluidframework/protocol-definitions';
import { IStream } from '@fluidframework/driver-definitions';
import { ISummaryContext } from '@fluidframework/driver-definitions';
import { ISummaryTree } from '@fluidframework/protocol-definitions';
import { ITelemetryBaseLogger } from '@fluidframework/common-definitions';
import { ITokenClaims } from '@fluidframework/protocol-definitions';
import { ReadDocumentStorageServiceBase } from '@fluidframework/replay-driver';
import { TypedEventEmitter } from '@fluidframework/common-utils';

// @public
export class FileDeltaStorageService implements IDocumentDeltaStorageService {
    constructor(path: string);
    // (undocumented)
    fetchMessages(from: number, to: number | undefined, abortSignal?: AbortSignal, cachedOnly?: boolean): IStream<api.ISequencedDocumentMessage[]>;
    getFromWebSocket(from: number, to: number): api.ISequencedDocumentMessage[];
    // (undocumented)
    get ops(): readonly Readonly<api.ISequencedDocumentMessage>[];
    }

// @public
export class FileDocumentService implements api_2.IDocumentService {
    constructor(storage: api_2.IDocumentStorageService, deltaStorage: FileDeltaStorageService, deltaConnection: api_2.IDocumentDeltaConnection);
    // (undocumented)
    connectToDeltaStorage(): Promise<api_2.IDocumentDeltaStorageService>;
    connectToDeltaStream(client: IClient): Promise<api_2.IDocumentDeltaConnection>;
    // (undocumented)
    connectToStorage(): Promise<api_2.IDocumentStorageService>;
    // (undocumented)
    dispose(): void;
    // (undocumented)
    get resolvedUrl(): api_2.IResolvedUrl;
    }

// @public
export class FileDocumentServiceFactory implements IDocumentServiceFactory {
    constructor(storage: IDocumentStorageService, deltaStorage: FileDeltaStorageService, deltaConnection: IDocumentDeltaConnection);
    // (undocumented)
    createContainer(createNewSummary: ISummaryTree, resolvedUrl: IResolvedUrl, logger?: ITelemetryBaseLogger): Promise<IDocumentService>;
    createDocumentService(fileURL: IResolvedUrl, logger?: ITelemetryBaseLogger): Promise<IDocumentService>;
    // (undocumented)
    readonly protocolName = "fluid-file:";
    }

// @public (undocumented)
export const FileSnapshotWriterClassFactory: <TBase extends ReaderConstructor>(Base: TBase) => {
    new (...args: any[]): {
        blobsWriter: Map<string, ArrayBufferLike>;
        commitsWriter: {
            [key: string]: api.ITree;
        };
        latestWriterTree?: api.ISnapshotTree | undefined;
        docId?: string | undefined;
        reset(): void;
        onCommitHandler(dataStoreName: string, tree: api.ITree): void;
        onSnapshotHandler(snapshot: IFileSnapshot): void;
        readBlob(sha: string): Promise<ArrayBufferLike>;
        getVersions(versionId: string, count: number): Promise<api.IVersion[]>;
        getSnapshotTree(version?: api.IVersion | undefined): Promise<api.ISnapshotTree | null>;
        write(tree: api.ITree, parents: string[], message: string, ref: string): Promise<api.IVersion>;
        writeOutFullSnapshot(tree: api.ITree): Promise<void>;
        sortTree(tree: api.ITree): void;
        buildTree(snapshotTree: api.ISnapshotTree): Promise<api.ITree>;
        repositoryUrl: string;
        readonly policies?: IDocumentStorageServicePolicies | undefined;
        createBlob(file: ArrayBufferLike): Promise<api.ICreateBlobResponse>;
        uploadSummaryWithContext(summary: api.ISummaryTree, context: ISummaryContext): Promise<string>;
        downloadSummary(handle: api.ISummaryHandle): Promise<api.ISummaryTree>;
        readonly disposed?: boolean | undefined;
        dispose?: ((error?: Error | undefined) => void) | undefined;
    };
} & TBase;

// @public (undocumented)
export const FileStorageDocumentName = "FileStorageDocId";

// @public
export class FluidFetchReader extends ReadDocumentStorageServiceBase implements IDocumentStorageService {
    constructor(path: string, versionName?: string | undefined);
    // (undocumented)
    protected docTree: api.ISnapshotTree | null;
    getSnapshotTree(version?: api.IVersion): Promise<api.ISnapshotTree | null>;
    getVersions(versionId: string, count: number): Promise<api.IVersion[]>;
    // (undocumented)
    readBlob(sha: string): Promise<ArrayBufferLike>;
    }

// @public (undocumented)
export const FluidFetchReaderFileSnapshotWriter: {
    new (...args: any[]): {
        blobsWriter: Map<string, ArrayBufferLike>;
        commitsWriter: {
            [key: string]: api.ITree;
        };
        latestWriterTree?: api.ISnapshotTree | undefined;
        docId?: string | undefined;
        reset(): void;
        onCommitHandler(dataStoreName: string, tree: api.ITree): void;
        onSnapshotHandler(snapshot: IFileSnapshot): void;
        readBlob(sha: string): Promise<ArrayBufferLike>;
        getVersions(versionId: string, count: number): Promise<api.IVersion[]>;
        getSnapshotTree(version?: api.IVersion | undefined): Promise<api.ISnapshotTree | null>;
        write(tree: api.ITree, parents: string[], message: string, ref: string): Promise<api.IVersion>;
        writeOutFullSnapshot(tree: api.ITree): Promise<void>;
        sortTree(tree: api.ITree): void;
        buildTree(snapshotTree: api.ISnapshotTree): Promise<api.ITree>;
        repositoryUrl: string;
        readonly policies?: IDocumentStorageServicePolicies | undefined;
        createBlob(file: ArrayBufferLike): Promise<api.ICreateBlobResponse>;
        uploadSummaryWithContext(summary: api.ISummaryTree, context: ISummaryContext): Promise<string>;
        downloadSummary(handle: api.ISummaryHandle): Promise<api.ISummaryTree>;
        readonly disposed?: boolean | undefined;
        dispose?: ((error?: Error | undefined) => void) | undefined;
    };
} & typeof FluidFetchReader;

// @public (undocumented)
export interface ISnapshotWriterStorage extends IDocumentStorageService {
    // (undocumented)
    onCommitHandler(dataStoreName: string, tree: api.ITree): void;
    // (undocumented)
    onSnapshotHandler(snapshot: IFileSnapshot): void;
    // (undocumented)
    reset(): void;
}

// @public (undocumented)
export type ReaderConstructor = new (...args: any[]) => IDocumentStorageService;

// @public
export class Replayer {
    constructor(deltaConnection: ReplayFileDeltaConnection, documentStorageService: FileDeltaStorageService);
    // (undocumented)
    get currentReplayedOp(): number;
    set currentReplayedOp(op: number);
    // (undocumented)
    get ops(): readonly Readonly<ISequencedDocumentMessage>[];
    replay(replayTo: number): number;
}

// @public (undocumented)
export class ReplayFileDeltaConnection extends TypedEventEmitter<IDocumentDeltaConnectionEvents> implements IDocumentDeltaConnection, IDisposable {
    constructor(details: IConnected, documentDeltaStorageService: FileDeltaStorageService);
    // (undocumented)
    get claims(): ITokenClaims;
    // (undocumented)
    get clientId(): string;
    static create(documentDeltaStorageService: FileDeltaStorageService): Promise<ReplayFileDeltaConnection>;
    // (undocumented)
    details: IConnected;
    // (undocumented)
    dispose(): void;
    // (undocumented)
    get disposed(): boolean;
    // (undocumented)
    get existing(): boolean;
    // (undocumented)
    getReplayer(): Replayer;
    // (undocumented)
    get initialClients(): ISignalClient[];
    // (undocumented)
    get initialMessages(): ISequencedDocumentMessage[];
    // (undocumented)
    get initialSignals(): ISignalMessage[];
    // (undocumented)
    readonly maxMessageSize: number;
    // (undocumented)
    get mode(): ConnectionMode;
    // (undocumented)
    get serviceConfiguration(): IClientConfiguration;
    // (undocumented)
    submit(documentMessages: IDocumentMessage[]): void;
    // (undocumented)
    submitSignal(message: any): Promise<void>;
    // (undocumented)
    get version(): string;
}


// (No @packageDocumentation comment for this package)

```
