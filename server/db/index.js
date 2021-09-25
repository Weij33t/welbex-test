const { Pool } = require('pg')

const port = +process.env.PORT || 5432
const host = 'hattie.db.elephantsql.com'
const password = 'A1B2KMMjv26KQWK7TuZO8LR3v5WAPkbU'
const user = 'wupfmcep'
const database = 'wupfmcep'

const pool = new Pool({
  host,
  port,
  user,
  password,
  database,
})

module.exports = pool
