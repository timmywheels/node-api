const apiService = require('../services/apiService');

module.exports.healthChecks = (req: any, res: any) => {
    return apiService.healthChecks(req, res);
};

module.exports.currentUser = (req: any, res: any) => {
    res.send(req.user);
};
