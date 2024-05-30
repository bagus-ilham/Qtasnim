const express = require('express')
const TransactionController = require('../controllers/transaction')
const authentication = require('../middlewares/auth')

const router = express.Router()

router.use(authentication)
router.get('/transaction', TransactionController.getAllTransaction)
router.get('/transaction/:id', TransactionController.getTransactionById)
router.post('/transaction', TransactionController.addTransaction)
router.put('/transaction/:id', TransactionController.editTransaction)
router.delete('/transaction/:id', TransactionController.deleteTransaction)

module.exports = router