// routes/expenses.js

const express = require('express');
const router = express.Router();

// Import specific functions from the expense controller
const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');

// GET all expenses
router.get('/', getExpenses);

// POST to add a new expense
router.post('/add', addExpense);

// PUT to update an expense by id
router.put('/update/:id', updateExpense);

// DELETE to remove an expense by id
router.delete('/delete/:id', deleteExpense);

module.exports = router;
