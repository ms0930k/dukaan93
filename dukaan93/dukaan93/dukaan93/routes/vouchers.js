// routes/vouchers.js

const express = require('express');
const router = express.Router();

// Destructure specific functions from the voucher controller
const { getVouchers, addVoucher, updateVoucher, deleteVoucher } = require('../controllers/voucherController');

// GET all vouchers
router.get('/', getVouchers);

// POST to add a new voucher
router.post('/add', addVoucher);

// PUT to update an existing voucher (by id)
router.put('/update/:id', updateVoucher);

// DELETE to remove a voucher (by id)
router.delete('/delete/:id', deleteVoucher);

module.exports = router;
