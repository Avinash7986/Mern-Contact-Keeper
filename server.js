const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect To Databse
connectDB();

app.use(express.json());

// Prevent NoSql Injection or Sanitize data
app.use(mongoSanitize());

// Set Security Headers
app.use(helmet());

// Prevent XSS attacks means running js code in user input
app.use(xss());

app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
