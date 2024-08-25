//setup server
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./db')
const authenticateToken = require('./middlewars/authToken');


//conect to mongoDB
connectDB()

// Middleware
app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/Users');
app.use('/account/login', usersRouter);
app.use('/account/register', usersRouter);

app.use(authenticateToken);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
