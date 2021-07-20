require('dotenv').config();
const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("connected to database");

    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    connectDatabase
};
