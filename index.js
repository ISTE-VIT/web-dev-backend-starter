require('dotenv').config()

const express = require('express')
require('express-async-errors')

const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const Song = require('./models/Song')

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use('/', require('./routes/api'))

app.use((err, req, res, next) => {
  console.log('error occured', err)
  return res.status(500).send({ errors: [err.toString()] })
})

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    await Song.init()
    console.log('Connected to Database')

    app.listen(process.env.PORT || 4000, () => {
      console.log('Now listening for requests')
    })
  })
