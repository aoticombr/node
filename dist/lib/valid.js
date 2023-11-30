"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
function Auth(req, res, next) {
    if (!req.body.auth) {
        res.status(200).json({ error: 'Missing Authorization Body' });
    }
    else if ((!req.body.auth.USER) || (!req.body.auth.PASS)) {
        res.status(200).json({ error: 'Missing Credentials Body' });
    }
    else {
        next();
    }
    // console.log(res);
}
exports.Auth = Auth;
