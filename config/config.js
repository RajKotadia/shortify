require('dotenv').config();

const env = process.env.NODE_ENV;

if (env === 'production') {
    module.exports = {
        mongoURI: process.env.MONGO_URI,
        port: process.env.PORT,
        baseURL: 'https://shortify.cyclic.app',
    };
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/Shortify',
        port: 3000,
        baseURL: 'http://localhost:3000',
    };
}
