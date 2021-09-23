const cors = require('cors')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

const tableRoute = require('./Routes/table.route')

app.use(cors())
app.use(express.json())
app.use('/api/table', tableRoute)

app.listen(PORT, () => console.log('Server started on port: ' + PORT))
