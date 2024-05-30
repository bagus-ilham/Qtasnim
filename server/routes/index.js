const express = require('express')
const user = require('./user')
const product = require('./product')
const productType = require('./productType')
const transaction = require('./transaction')
const errorHandler = require('../middlewares/errorHander')

const router = express.Router()

router.use(user)
router.use(product)
router.use(productType)
router.use(transaction)

router.use(errorHandler)

module.exports = router