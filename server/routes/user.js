const express = require('express')
const authentication = require('../middlewares/auth')
const UserController = require('../controllers/user')

const router = express.Router()

router.post('/login', UserController.login)

router.use(authentication)
router.post('/register', UserController.register)

module.exports = router