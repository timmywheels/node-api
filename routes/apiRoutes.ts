export {};
const apiController = require('../controllers/apiController');
const authenticated = require('../middlewares/authenticated');

module.exports = (app: any) => {
    app.set('trust proxy', 1);
    app.get('/api/healthchecks', apiController.healthChecks);
    app.get('/api/current_user', authenticated, apiController.currentUser);
};
