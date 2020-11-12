const express = require('express')
const router = express.Router();

const usersController = require('../controllers/users-controllers')

router.get('/', (req, res) => {
    res.json({users: 'users ok'});
})

router.post('/signup', usersController.signupUSer)

module.exports = router;