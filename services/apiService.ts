module.exports.healthChecks = (req: any, res: any) => {
    const healthCheck = {
        uptime: process.uptime(),
        status: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthCheck);
    } catch (e) {
        healthCheck.status = e;
        res.status(503).send(healthCheck);
    }
};