/**
 * ConnectionConfig as ConvenantSQL connection configs
 */
export interface ConnectionConfig {
  /**
   * Connection endpoint, format should be host:port (e.g. localhost:11105)
   */
  readonly endpoint: string

  /**
   * Database id of current connection
   */
  readonly dbid: string
}
