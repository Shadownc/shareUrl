import {Router} from 'express'

const router = Router()

const URL = require('url');
// Mock Users
const User = require('../model/users');

/* GET users listing. */
router.get('/users', function (req, res, next) {
    var params = URL.parse(req.url, true).query;
    var response;
    if (params.name) {
        console.log(params.name)
        User.find({username: params.name}, (err, user) => {
            response = {status: 1, data: user};
            res.send(JSON.stringify(response));
        });
    } else {
        response = {status: 0};
        res.send(JSON.stringify(response));
    }
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    if (id >= 0 && id < users.length) {
        res.json(users[id])
    } else {
        res.sendStatus(404)
    }
})
router.get('/getUserInfo', function (req, res, next) {

});

export default router
