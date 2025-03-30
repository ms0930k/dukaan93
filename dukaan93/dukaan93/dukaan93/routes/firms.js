// routes/firms.js

const express = require('express');
const router = express.Router();

// Import controller functions from firmController
const { getFirms, addFirm, updateFirm, deleteFirm } = require('../controllers/firmController');

// Define routes for firm operations

// GET all firms
router.get('/', getFirms);

// POST to add a new firm
router.post('/add', addFirm);

// PUT to update an existing firm (by id)
router.put('/update/:id', updateFirm);

// DELETE to remove a firm (by id)
router.delete('/delete/:id', deleteFirm);

module.exports = router;
