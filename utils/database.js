const mongoose = require('mongoose');
const keys = require('../config/keys');

const db = keys.MONGO.URI;

const gracefulShutdown = (message, callback) => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through ' + message);
		callback();
	});
};

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
};

mongoose
	.connect(db, options)
	.then(
		db => {
			const host = db.connections[0].host;
			console.log('Mongoose connected to:', host);
		},
		err => {
			console.log('Mongoose connection error:', err);
			process.exit(0);
		}
	)
	.catch(err => err);

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});

process.on('exit', code => {
	console.log('About to exit with code:', code);
});

require('../models/User');
