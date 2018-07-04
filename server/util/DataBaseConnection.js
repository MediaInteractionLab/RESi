const mongoose = require('mongoose');
const settings = require('../parameters');

let mongoDB;

if(settings.database.useOnline) {
    mongoDB = settings.database.online.mongoPath;
} else {
    mongoDB = settings.database.local.mongoPath;
}

mongoose.connect(mongoDB);

// use the global promise library
mongoose.Promise = global.Promise;

// default connection
const db = mongoose.connection;

// bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));