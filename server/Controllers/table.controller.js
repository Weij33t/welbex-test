const db = require('../db/index.js')

const getWhereByCondition = (condition, column, value) => {
  switch (condition) {
    case 'contains':
      return `WHERE ${column} LIKE '%' || '${value}' || '%'`
    case 'greater':
      return `WHERE ${column} > ${value}`
    case 'lower':
      return `WHERE ${column} < ${value}`
    case 'equals':
      return `WHERE ${column}=${value}`

    default:
      break
  }
}

const buildQuery = (whereCondition) => {
  return 'SELECT * FROM welbex ' + whereCondition
}

const controller = {
  async getRows(req, res) {
    const { from, to } = req.query
    console.log(from, to)
    await db.query(
      'SELECT * FROM welbex WHERE id >= $1 AND id <= $2',
      [from, to],
      (err, data) => {
        if (err) {
          throw err
        }
        res.send({ data: data.rows, length: data.rows.length })
      }
    )
  },
  async filterRows(req, res) {
    const { name, condition, value } = req.query
    const whereCondition = getWhereByCondition(condition, name, value)
    const query = buildQuery(whereCondition)
    console.log(query, name, condition, value)
    await db.query(query, [], (err, data) => {
      if (err) {
        throw err
      }
      res.send({ data: data.rows, length: data.rows.length })
    })
  },
}

module.exports = controller
