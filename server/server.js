const express = require('express')
require('dotenv').config()
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const rootRouter = require('./routers')
const PORT = process.env.PORT || 8000

const app = express()

app.set('port', PORT)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


app.use('/', express.static(path.join(__dirname, '../public')))

app.use('/api', rootRouter)

app.listen(app.get('port'), () => console.log('Server running on port', app.get('port')))
