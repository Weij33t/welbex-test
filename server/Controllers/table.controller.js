const db = require('../db/index.js')

const getWhereByCondition = (condition, column, value) => {
  switch (condition) {
    case 'contains':
      return `WHERE ${column} LIKE '%' || '${value}' || '%'`
    case 'greater':
      if (+value !== +value || column === 'name') {
        return false
      }
      return `WHERE ${column} > CAST ('${value}' AS INTEGER)`
    case 'lower':
      if (+value !== +value || column === 'name') {
        return false
      }
      return `WHERE ${column} < CAST ('${value}' AS INTEGER)`
    case 'equals':
      return `WHERE ${column}='${value}'`

    default:
      break
  }
}

const buildQuery = (whereCondition) => {
  return 'SELECT * FROM welbex ' + whereCondition
}

const controller = {
  async getRowsPortion(req, res) {
    const { offset, limit, column, condition, value } = req.query
    let query
    let queryParams = [offset, limit]
    let length = 0
    if (column && condition && value) {
      const whereCondition = getWhereByCondition(condition, column, value)
      if (whereCondition === false) {
        res.status(400).send('bad request')
        return false
      }
      console.log(offset, limit)
      query = buildQuery(whereCondition) + ' OFFSET $1 LIMIT $2'
    } else {
      query = 'SELECT * FROM welbex OFFSET $1 LIMIT $2'
    }
    console.log(query, offset, limit)
    await db.query(query, queryParams, (err, data) => {
      if (err) {
        throw err
      }
      console.log(data.rows.length)
      res.json(data.rows)
    })
  },
  async getRowsCount(req, res) {
    const { column, condition, value } = req.query
    let query
    if (column && condition && value) {
      const whereCondition = getWhereByCondition(condition, column, value)
      if (whereCondition === false) {
        res.status(400).send('bad request')
        return false
      }
      query = 'SELECT COUNT(*) from welbex ' + whereCondition
    } else {
      query = 'SELECT COUNT(*) from welbex'
    }
    console.log(query, column, condition, value)
    await db.query(query, [], (err, data) => {
      if (err) {
        throw err
      }
      res.send(data.rows[0].count)
    })
  },
}

module.exports = controller
