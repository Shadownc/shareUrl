import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'

const mongoose = require('mongoose')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// 连接数据库后再监听端口

mongoose.connect('mongodb://localhost/vue_test', {
  useMongoClient: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
  .once('open', function () {
    app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port)
  })
