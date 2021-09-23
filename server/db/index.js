const { Pool } = require('pg')

const port = +process.env.PORT || 5432
const host = 'localhost'
const password = '12k34t56i'
const user = 'postgres'
const database = 'welbex'

const pool = new Pool({
  host,
  port,
  user,
  password,
  database,
})

module.exports = pool
