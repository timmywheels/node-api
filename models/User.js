const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortid = require('shortid');

const userSchema = new Schema({
	_id: { type: String, default: shortid.generate, required: true },
	username: { type: String, default: shortid.generate },
	name: { type: String, default: null },
	email: { type: String, default: null },
	phone: { type: String, default: null },
	pendingPhone: { type: String, default: null },
	avatar: { type: String, default: null },
	isRegistered: { type: Boolean, default: false },
	registrationDate: { type: Date, default: Date.now },
	admin: { type: Boolean, default: false },
	hashedPassword: { type: String, default: null },
	confirmationCode: { type: String, default: null },
	deviceConfirmationCode: { type: String, default: null },
	resetPasswordToken: { type: String, default: null },
	authStrategy: { type: String, default: null },
	googleId: String,
	google: {
		googleId: String,
		name: String,
		email: String,
		avatar: String
	}
});

mongoose.model('users', userSchema);
