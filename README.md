# cql-js-driver

This repo is javascript lib to interact with [CovenantSQL](https://github.com/CovenantSQL/CovenantSQL) local proxy.

## Install

Install `cql-js-driver` via npm or yarn:
```bash
npm install --save cql-js-driver
```
or
```bash
yarn add cql-js-driver
```

## Get started
Follow CovenantSQL [QuickStart](https://testnet.covenantsql.io/quickstart) to get you prepared.

### use testnet proxy directly

We provides testnet proxy for your testing: `http(s)://testnet-proxy.covenantsql.io`

```javascript
const config = {
    endpoint: 'https://testnet-proxy.covenantsql.io',
    dbid: `${DB_ID}`, // your DB id created by `cql` tools in QuickStart
}
```

### if you setup your own proxy

1. set up CovenantSQL local proxy

```bash
$ go get github.com/CovenantSQL/CovenantSQL
$ make bin/cql
$ rsync -avP ./conf/testnet/{config.yaml,private.key} ~/.cql/
$ ./bin/cql -adapter 127.0.0.1:11105
```

2. fill in the configs

```javascript
const config = {
    endpoint: '127.0.0.1:11105', // local testnet endpoint without https
    dbid: `${DB_ID}`, // your DB id created by `cql` tools
}
```

### connect and query
```typescript
import cql from 'cql-js-driver'

const config = {...} // see above

cql.createConnection(config).then(async (connection: any) => {
    // read
    const data1 = await connection.query("select ? + ?", [2.1, 3.2]);
    console.log(data1);

    // write
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS contacts (\
    contact_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email text NOT NULL UNIQUE,
    phone text NOT NULL UNIQUE
    );
    `
    const status1 = await connection.exec(createTableSQL)
    console.log(`exec1 status:`, status1);

    const data2 = await connection.query("show tables;");
    console.log(data2);
}).catch((e: any) => console.log(e))
```

## Contribution

- `yarn dev`
- open `http://localhost:8080/examples/`

## License

[Apache-2.0](LICENSE).
