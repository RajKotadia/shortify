require('dotenv').config();

const env = process.env.NODE_ENV;

if (env === 'production') {
    module.exports = {
        port: process.env.PORT,
    };
} else {
    module.exports = {
        port: 3000,
    };
}
