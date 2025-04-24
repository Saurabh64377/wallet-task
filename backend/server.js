const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./db/connectDb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong on the server!" });
});

// route
app.use('/api' , require('./route/walletRoute'))

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`Server is running on PORT ${PORT}`);
    } catch (error) {
        console.log("Database connection failed!");
    }
});
