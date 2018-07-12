const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const path = require('path')
const port = process.env.PORT || 8000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'client', 'build')))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/full_stack_app', (err) => {
    if (err) throw err
    console.log('Connected to the database')
})

app.use('/decks', require('./routes/deckRoutes'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => console.log(`Server is running on port ${port}`))