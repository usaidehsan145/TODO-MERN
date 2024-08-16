const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
