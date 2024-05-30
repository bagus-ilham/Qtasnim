const express = require('express')
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHander')

const router = express.Router()

router.use(authentication)
router.get('/product', ProductController.getAllProduct)
router.get('/product/:id', ProductController.getProductById)
router.post('/product', ProductController.addProduct)
router.put('/product/:id', ProductController.editProduct)
router.delete('/product/:id', ProductController.deleteProduct)

router.use(errorHandler)

module.exports = router