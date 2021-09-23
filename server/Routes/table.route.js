const { Router } = require('express')
const router = new Router()
const tableController = require('../Controllers/table.controller')

router.get('/rows/', tableController.getRows)
router.get('/rows/filter', tableController.filterRows)

module.exports = router
