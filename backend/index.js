const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const cors = require('cors'); // Import cors
const expenseRoutes = require('./routes/expensesRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const serviceAccount = require('./firebase-service-account.json');

const app = express();

const PORT = 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Middleware for Firebase Auth
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};

// Enable CORS for frontend
app.use(cors({ origin: 'http://localhost:8080' })); // Allow requests from the frontend

// Connect to MongoDB
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use(express.json());
app.use('/api/expenses', expenseRoutes);
app.use('/api', dashboardRoutes); // Add dashboard routes

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
