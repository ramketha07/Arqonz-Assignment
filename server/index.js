const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with auto-retry
let currentRetryDelayMs = 1000; // start with 1s
const maxRetryDelayMs = 30000; // cap at 30s

async function connectWithRetry() {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // fail fast if not reachable
    });
    currentRetryDelayMs = 1000; // reset on success
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}. Retrying in ${Math.floor(currentRetryDelayMs / 1000)}s...`);
    setTimeout(connectWithRetry, currentRetryDelayMs);
    currentRetryDelayMs = Math.min(currentRetryDelayMs * 2, maxRetryDelayMs);
  }
}

// Connection state logging and auto-reconnect on drop
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Attempting to reconnect...');
  setTimeout(connectWithRetry, Math.min(currentRetryDelayMs, maxRetryDelayMs));
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

connectWithRetry();

// Import routes
const dashboardRoutes = require('./routes/dashboard');
const mentorRoutes = require('./routes/mentors');

// Use routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/mentors', mentorRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Dashboard API Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
