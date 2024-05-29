const express = require('express')
const errorHandler = require('../middlewares/errorHander')
const user = require('../user')
const product = require('./product')
const productType = require('./productType')

const router = express.Router()

router.use(user)
router.use(product)
router.use(productType)

router.use(errorHandler)

module.exports = router