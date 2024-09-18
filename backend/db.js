const mongoose = require('mongoose');

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@nikita.8lbgr9v.mongodb.net/?retryWrites=true&w=majority&appName=Nikita`,
    );
    console.log('mongoDB conected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
