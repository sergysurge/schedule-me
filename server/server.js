const express = require('express')
const path = require('path')
require('dotenv').config()
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const rootRouter = require('./routers')
const PORT = process.env.PORT || 8000

const app = express()

app.set('port', PORT)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// app.use(express.static(path.join(__dirname, '../src')))
// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../src/index.html'))
// })

app.use('/api', rootRouter)

app.listen(app.get('port'), () => console.log('Server running on port', app.get('port')))
