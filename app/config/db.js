const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connection.on('connected', () => console.log('MongoDB connecté'));
const connectDB = async () => {
    await
        mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:27017/cave`).
            catch(error => {
                console.error(error.message);
                process.exit(1);
            });
};
module.exports = connectDB;
