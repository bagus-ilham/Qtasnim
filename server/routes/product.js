const express = require('express')
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/auth')

const router = express.Router()

router.use(authentication)
router.get('/product', ProductController.getAllProduct)
router.get('/product/id', ProductController.getProductById)
router.post('/product', ProductController.addProduct)
router.put('/product', ProductController.editProduct)
router.delete('/product', ProductController.deleteProduct)

module.exports = router