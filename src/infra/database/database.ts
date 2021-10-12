import pgPromise from 'pg-promise'

const promise = pgPromise({})

const database = promise({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'parking_lot',
  idleTimeoutMillis: 100
})

export default database
