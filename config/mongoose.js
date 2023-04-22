// require the library
const mongoose = require('mongoose');

// connect to the database
// mongoose.connect('mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false');
mongoose.connect('mongodb://localhost/contact_list_db')

// acquire the connection to check if it's successful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'Error connecting to DB'))

// up and running
db.once('open', function() {
    console.log('Successfully connected to the database');
})