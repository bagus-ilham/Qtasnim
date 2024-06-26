const express = require('express')
const ProductTypeController = require('../controllers/productType')
const authentication = require('../middlewares/auth')

const router = express.Router()

router.use(authentication)
router.get('/producttype', ProductTypeController.getAllProductType)
router.get('/producttype/:id', ProductTypeController.getProductTypeById)
router.post('/producttype', ProductTypeController.addProductType)
router.put('/producttype/:id', ProductTypeController.editProductType)
router.delete('/producttype/:id', ProductTypeController.deleteProductType)

module.exports = router