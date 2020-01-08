const apiController = require('../controllers/apiController');

module.exports = (app: any) => {
    app.set('trust proxy', 1);

    app.get('/api/healthchecks', apiController.healthChecks);
};