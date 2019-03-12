import "whatwg-fetch"
import SqlString from 'sqlstring'

import { ConnectionConfig } from './ConnectionConfig'
import ObjectUtils from './util/ObjectUtils'

/**
 * Connection class for ConvenantSQL connection
 */
export class Connection {
  readonly config: ConnectionConfig
  readonly _connectCalled: boolean = false
  readonly _state: 'disconnected' | 'connected'

  /**
   * @param {ConnectionConfig} a ConnectionConfig instance for current connection
   */
  constructor(_config: ConnectionConfig) {
    this.config = _config
    this._connectCalled = false
    this._state = 'disconnected'
  }

  /**
   * connect CovenantSQL
   */
  async connect(): Promise<this> {
    if (this._connectCalled || this._state === 'connected') { return this }
    try {
      const datarows = await this.query('SELECT 1', [], true)
      if (datarows !== null) {
        ObjectUtils.assign(this, {
          _state: 'connected',
          _connectCalled: true,
        })
        return this
      }
    } catch (e) {
      throw new Error(e)
    }

    return this
  }

  /**
   * Query a SQL on CovenantSQL
   */
  async query(
    sql: string,
    values?: object | Array<any>,
    isEstablish: boolean = false
  ): Promise<any> {
    try {
      const formattedSql = SqlString.format(sql, values || [])
      const rows = await this._fetch('query', formattedSql)
      return rows
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * Exec a SQL on CovenantSQL
   */
  async exec(sql: string, values?: object | Array<any>): Promise<any> {
    try {
      const formattedSql = SqlString.format(sql, values || [])
      const rows = await this._fetch('exec', formattedSql)
      return rows
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * _fetch: request promise for query and exec
   */
  protected async _fetch(
    method: 'query' | 'exec',
    sql: string
  ): Promise<any> {
    const database = this.config.dbid
    let uri = `http://${this.config.endpoint}/v1/${method}`

    let options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ assoc: true, database, query: sql }),
    }

    try {
      const res = await fetch(uri, options)
      const result = await res.json()
      const _parsed = this._parseResult(result)
      return _parsed.datarows
    } catch (e) {
      throw e
    }
  }

  /**
   * _parseResult: parse CovenantSQL response
   */
  protected _parseResult(result: any): any {
    const datarows = (result.data && result.data.rows) || null
    return { datarows, status: result.status }
  }
}
