import { Router } from 'express'

const router = Router()

const URL = require('url')
// Mock Users
const User = require('../model/users')

let response

/* GET users listing. */
router.get('/users', function (req, res, next) {
  var params = URL.parse(req.url, true).query
  if (params.name) {
    User.find({username: params.name}, (err, user) => {
      if (err) console.error(err)
      response = {status: 1, data: user}
      res.send(JSON.stringify(response))
    })
  } else {
    response = {status: 0}
    res.send(JSON.stringify(response))
  }
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = req.params.id
  if (id) {
    // res.json(users[id])
    User.findOne({username: id}, (err, user) => {
      if (err) console.error(err)
      response = {status: 1, data: user}
      res.json(response)
    })
  } else {
    res.sendStatus(404)
  }
})
router.get('/getUserInfo', function (req, res, next) {

})

export default router
