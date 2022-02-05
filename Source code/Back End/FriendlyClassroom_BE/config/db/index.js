require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('Connect MongoDB successfully!!!');
    } catch (error) {
        console.log('Connect MongoDB failure!!!');
        process.exit(1);
    }
}

module.exports = { connect };