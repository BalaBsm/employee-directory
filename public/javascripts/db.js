var chalk = require('chalk');
var mongoose = require('mongoose');

var dbURI = 'mongodb://EMP:E12345@ds139470.mlab.com:39470/bsmdb';
console.log(chalk.yellow("Establishing connection to the DB"));

//   ****** CONNECTIONS
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
    console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function(err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function() {
    console.log(chalk.red('Mongoose disconnected'));
});

// ***** *******  *  *****   Schema defs
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    age: { type: String, required: true },
    department: { type: String, required: true },
    gender: { type: String, required: true }
}, { collection: 'EmployeeCollection' });

// register the User model
mongoose.model('UserModel', userSchema);