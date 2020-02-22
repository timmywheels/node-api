module.exports.authGoogleLogin = (req: any, res: any) => {
    res.send({ res: JSON.stringify(res) });
};

module.exports.authGoogleCallback = (req: any, res: any) => {
    res.redirect('/dashboard');
};

module.exports.authLogout = (req: any, res: any) => {
    req.logout();
    res.redirect('/');
};
