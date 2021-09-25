const db = require('../db/index.js')

const getWhereByCondition = (condition, column, value) => {
  switch (condition) {
    case 'contains':
      if (+value === +value) return false

      return `WHERE ${column} LIKE '%' || '${value}' || '%'`
    case 'greater':
      if (+value !== +value || column === 'name') return false

      return `WHERE ${column} > CAST ('${value}' AS INTEGER)`
    case 'lower':
      if (+value !== +value || column === 'name') return false

      return `WHERE ${column} < CAST ('${value}' AS INTEGER)`
    case 'equals':
      return `WHERE ${column}='${value}'`

    default:
      break
  }
}

const buildQuery = (whereCondition) => {
  return 'SELECT * FROM welbex ' + whereCondition + ' OFFSET $1 LIMIT $2'
}

const controller = {
  async getRowsPortion(req, res) {
    const { offset, limit, column, condition, value } = req.query
    let query
    let queryParams = [offset, limit]
    if (column && condition && value) {
      const whereCondition = getWhereByCondition(condition, column, value)
      if (whereCondition === false) {
        res.status(400).send('bad request')
        return false
      }
      query = buildQuery(whereCondition)
    } else {
      query = 'SELECT * FROM welbex OFFSET $1 LIMIT $2'
    }
    await db.query(query, queryParams, (err, data) => {
      if (err) {
        throw err
      }
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
    await db.query(query, [], (err, data) => {
      if (err) {
        throw err
      }
      res.send(data.rows[0].count)
    })
  },
}

module.exports = controller
