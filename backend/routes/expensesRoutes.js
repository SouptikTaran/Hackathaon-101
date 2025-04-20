const express = require('express');
const Expense = require('../models/ExpenseSchema');

const router = express.Router();

// Get all expenses for the authenticated user
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.uid });
        res.json(expenses);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Add a new expense
router.post('/', async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const expense = new Expense({ title, amount, category, date, userId: req.user.uid });
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).send('Bad request');
    }
});

// Update an expense
router.put('/:id', async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.uid },
            { title, amount, category, date },
            { new: true }
        );
        if (!expense) return res.status(404).send('Expense not found');
        res.json(expense);
    } catch (err) {
        res.status(400).send('Bad request');
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
        if (!expense) return res.status(404).send('Expense not found');
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
