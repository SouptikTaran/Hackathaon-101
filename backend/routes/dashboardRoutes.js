const express = require('express');
const router = express.Router();

// Mock data for demonstration
const categoryLimits = [
    { category: 'Food', limit: 500, spent: 300 },
    { category: 'Transport', limit: 200, spent: 150 },
    { category: 'Entertainment', limit: 300, spent: 100 },
];

const recentExpenses = [
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: 65.75,
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
      category: 'Food',
    },
    {
      id: 2,
      description: 'Movie Tickets',
      amount: 25.99,
      date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
      category: 'Entertainment',
    },
    {
      id: 3,
      description: 'Gas',
      amount: 45.5,
      date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
      category: 'Travel',
    },
    {
      id: 4,
      description: 'Internet Bill',
      amount: 79.99,
      date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
      category: 'Bills',
    },
    {
      id: 5,
      description: 'New Shoes',
      amount: 89.95,
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
      category: 'Shopping',
    },
    {
      id: 6,
      description: 'Coffee',
      amount: 4.5,
      date: new Date().toISOString(),
      category: 'Food',
    },
    {
      id: 7,
      description: 'Mobile Bill',
      amount: 55.0,
      date: new Date().toISOString(),
      category: 'Bills',
    },
    {
      id: 8,
      description: 'Uber',
      amount: 18.75,
      date: new Date().toISOString(),
      category: 'Travel',
    },
  ];

  const mockServices = [
    {
      id: "1",
      name: "Netflix",
      cost: 15.99,
      renewal_date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    },
    {
      id: "2",
      name: "Spotify",
      cost: 9.99,
      renewal_date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
    },
    {
      id: "3",
      name: "Amazon Prime",
      cost: 12.99,
      renewal_date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    },
    {
      id: "4",
      name: "Disney+",
      cost: 7.99,
      renewal_date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
    },
  ];
  

  router.get('/services', (req, res) => {
    res.json(mockServices);
  })

const spendingTrends = [
    { date: '2023-09-27', amount: 50 },
    { date: '2023-09-28', amount: 30 },
    { date: '2023-09-29', amount: 70 },
    { date: '2023-09-30', amount: 40 },
    { date: '2023-10-01', amount: 60 },
    { date: '2023-10-02', amount: 20 },
    { date: '2023-10-03', amount: 15 },
];

const expenseChart = [
    { category: 'Food', amount: 300 },
    { category: 'Transport', amount: 150 },
    { category: 'Entertainment', amount: 100 },
    {category: 'Transport', amount: 200 },
    {category: 'Bills', amount: 500 },  
];

const dailyLimit = { spent: 120, limit: 200 };

// Routes
router.get('/category-limits', (req, res) => {
    res.json(categoryLimits);
});

router.get('/recent-expenses', (req, res) => {
    res.json(recentExpenses);
});

router.get('/spending-trends', (req, res) => {
    res.json(spendingTrends);

});

router.get('/expense-chart', (req, res) => {
    res.json(expenseChart); // Ensure this endpoint returns the chart data
});

router.get('/daily-limit', (req, res) => {
    res.json(dailyLimit); // Ensure this endpoint returns the total spent and limit
});

module.exports = router;
