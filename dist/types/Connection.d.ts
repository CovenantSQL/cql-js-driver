import "whatwg-fetch";
import { ConnectionConfig } from './ConnectionConfig';
/**
 * Connection class for ConvenantSQL connection
 */
export declare class Connection {
    readonly config: ConnectionConfig;
    readonly _connectCalled: boolean;
    readonly _state: 'disconnected' | 'connected';
    /**
     * @param {ConnectionConfig} a ConnectionConfig instance for current connection
     */
    constructor(_config: ConnectionConfig);
    /**
     * connect CovenantSQL
     */
    connect(): Promise<this>;
    /**
     * Query a SQL on CovenantSQL
     */
    query(sql: string, values?: object | Array<any>, isEstablish?: boolean): Promise<any>;
    /**
     * Exec a SQL on CovenantSQL
     */
    exec(sql: string, values?: object | Array<any>): Promise<any>;
    /**
     * _fetch: request promise for query and exec
     */
    protected _fetch(method: 'query' | 'exec', sql: string): Promise<any>;
    /**
     * _parseResult: parse CovenantSQL response
     */
    protected _parseResult(result: any): any;
}
