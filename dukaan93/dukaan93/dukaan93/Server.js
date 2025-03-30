const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const firmRoutes = require('./routes/firms');
const productRoutes = require('./routes/products');
const partyRoutes = require('./routes/parties');
const voucherRoutes = require('./routes/vouchers');
const expenseRoutes = require('./routes/expenses');
const reportRoutes = require('./routes/reports');

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }); // 100 requests per 15 minutes
const app = express();
app.use(limiter);

// Import error handler middleware
const errorHandler = require('./middlewares/errorHandler');

// Initialize app

// Connect to MongoDB
// Connect to MongoDB with error handling
connectDB().catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
  

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure sessions
if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing in environment variables!");
  }
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      cookie: { maxAge: 24 * 60 * 60 * 1000 }
    })
  );
  

// Passport middleware
require('./config/auth');
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/firms', firmRoutes);
app.use('/api/products', productRoutes);
app.use('/api/parties', partyRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorHandler);

// Serve HTML for all other routes (SPA-like behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));