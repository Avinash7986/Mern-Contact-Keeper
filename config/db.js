const mongoose = require('mongoose');
const config = require('config');

const dbURL = config.get('mongoURI');

const connectDB = () => {
  mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Mongodb Connected'))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
