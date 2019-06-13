const CustomerController = require('../controllers/customer');
const express = require('express');
const router = express.Router();

router.post('/customer', CustomerController.post);
router.get('/customer', CustomerController.get);
router.put('/customer', CustomerController.put);
router.delete('/customer', CustomerController.delete);

module.exports = router;
