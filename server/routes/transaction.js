const express = require('express')
const TransactionController = require('../controllers/transaction')
const authentication = require('../middlewares/auth')

const router = express.Router()

router.use(authentication)
router.get('/transaction', TransactionController.getAllProduct)
router.get('/transaction/id', TransactionController.getProductById)
router.post('/transaction', TransactionController.addProduct)
router.put('/transaction', TransactionController.editProduct)
router.delete('/transaction', TransactionController.deleteProduct)

module.exports = router