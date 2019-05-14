const covenantsql = require('../dist/covenantsql-proxy.js')

const connectionConfig = {
  endpoint: 'http://testnet-proxy.covenantsql.io',
  database: '16c421128eeb8bb6c35eb633a16d206edbd653ce52c52dcda0abb767d2bb9ed0'
}

describe("Format test", () => {
  it("works if Format works", () => {
    const formatted = covenantsql.format('select * from ?? limit ?', ['test_table', 1])
    expect(formatted === 'select * from `test_table` limit 1').toBeTruthy()
  })
})

describe("Connection test", () => {
  it("works if connection state is connected", async () => {
    const connection = await covenantsql.createConnection(connectionConfig)
    expect(connection._state === 'connected').toBeTruthy()
  })
})

describe("Read test", () => {
  it("works if query response right answers", async () => {
    const connection = await covenantsql.createConnection(connectionConfig)
    const data = await connection.query('select ? + ?', [2, 3])
    expect(Object.values(data[0])[0] === 5).toBeTruthy()
  })
})

describe("Write test", () => {
  it("works if exec response status is true", async () => {
    const connection = await covenantsql.createConnection(connectionConfig)
    const status = await connection.exec('replace into test_python_driver values(?), (?), (?)', ['test11', 'test22', 'test33'])
    expect(status).toBeTruthy()
  })
})

describe("parse test", () => {
  it("works if exec response status is true", () => {
    covenantsql.createConnection(connectionConfig).then(connection => {
      const mock = JSON.stringify({
        "data": {
          "rows": [
            {
              "test": 0
            }
          ]
        },
        "status": "ok",
        "success": false
      })

      // expect(connection._parseResult(mock)).toThrow()
    })
  })
})
