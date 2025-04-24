const express = require('express')
const walletController = require('../controller/walletController')


const route = express.Router();

route.get('/' , walletController.getAllTransactions)
route.post('/add' ,walletController.addMoney)
route.post('/withdrwa' ,walletController.withdrwaMoney)

module.exports = route