const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		async (username, password, done) => {
			const plainTextPassword = password;
			const user = await User.findOne({ email: username });

			if (user && user.isRegistered) {
				const passwordMatch = bcrypt.compareSync(plainTextPassword, user.hashedPassword);
				if (passwordMatch) {
					console.log(`User logged in: ${user.email}`);
					return done(null, user);
				} else if (!passwordMatch) {
					return done(null, false);
				}
			} else {
				return done(null, false);
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.GOOGLE.CLIENT_ID,
			clientSecret: keys.GOOGLE.CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const email = profile.emails[0].value;
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				await existingUser.update({
					google: {
						googleId: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						avatar: profile.photos[0].value
					}
				});
				console.log(`User logged in via Google: ${existingUser.email}`);
				return done(null, existingUser);
			}

			const user = await new User({
				authStrategy: 'google',
				googleId: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
				avatar: profile.photos[0].value,
				isRegistered: true,
				isPro: true, // free trial
				isFreeTrial: true
			}).save();
			console.log(`User registered via Google: ${user.email}`);
			return done(null, user);
		}
	)
);
