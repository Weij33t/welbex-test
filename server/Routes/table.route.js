const { Router } = require('express')
const router = new Router()
const tableController = require('../Controllers/table.controller')

router.get('/rows/', tableController.getRowsPortion)
router.get('/rows/count', tableController.getRowsCount)

module.exports = router
