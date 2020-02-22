export {};
const authController = require('../controllers/authController');
const cookieParser = require('cookie-parser');
const passport = require('passport');

module.exports = (app: any) => {
    app.use(cookieParser());

    app.get('/auth/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }), authController.authGoogleLogin);

    app.get('/auth/google/callback', passport.authenticate('google'), authController.authGoogleCallback);

    app.get('/auth/logout', authController.authLogout);
};
