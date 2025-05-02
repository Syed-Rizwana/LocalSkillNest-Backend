const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const professionalRoutes = require('./routes/professional');
const app = express();

dotenv.config();
app.use(express.json());

// Connect to MongoDB
// MongoDB Connection
mongoose.connect("mongodb+srv://gofood:mlRWAjwjIoCKM3TP@cluster0.5qbblkc.mongodb.net/LocalSkillConnectDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));


// Use routes
app.use('/api', professionalRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

