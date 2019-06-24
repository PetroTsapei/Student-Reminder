const CustomerController = require('../controllers/customer');
const tokenVerify = require('../helpers/tokenVerify');
const express = require('express');
const router = express.Router();

router.post('/customer', CustomerController.post);
router.get('/customer', tokenVerify, CustomerController.get);
router.put('/customer', CustomerController.put);
router.delete('/customer', CustomerController.delete);

module.exports = router;
