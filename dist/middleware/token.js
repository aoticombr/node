"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = exports.authorization = exports.bearer = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwt = jsonwebtoken_1.default;
var consts_1 = require("../constantes/consts");
function bearer(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    var BEARER = req.headers.authorization; //console.log(Aut);
    var TOKEN_BEARER = BEARER.split(" ")[1]; //console.log(base64_token);
    jsonwebtoken_1.default.verify(TOKEN_BEARER, consts_1.SECRET, function (err, decoded) {
        req.usuario = decoded;
        if (err) {
            return res.status(401).send(err);
        }
        next();
    });
}
exports.bearer = bearer;
function authorization(req, res, next) {
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    next();
}
exports.authorization = authorization;
