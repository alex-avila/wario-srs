const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const port = 8000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(fileUpload())

mongoose.connect('mongodb://localhost/full_stack_app', (err) => {
    if (err) throw err
    console.log('Connected to the database')
})

app.use('/decks', require('./routes/deckRoutes'))

app.listen(port, () => console.log(`Server is running on port ${port}`))