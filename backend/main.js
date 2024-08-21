//setup server
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db')
const authenticateToken = require('./middlewars/authToken');


//conect to mongoDB
connectDB()

// Middleware
app.use(cors());
app.use(express.json());
app.use(authenticateToken);



const usersRouter = require('./routes/Users');
app.use('/account', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})