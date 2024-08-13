//setup server
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRouter = require('./routes/users');

//more uses
app.use(cors());
app.use(express.json());

app.use('/account', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})