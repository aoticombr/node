"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.https_generico = void 0;
var https_1 = __importDefault(require("https"));
function https_generico(body, options) {
    return new Promise(function (resolve, reject) {
        var req = https_1.default.request(options, function (res) {
            var chunks = [];
            res.on('data', function (data) { return chunks.push(data); });
            res.on('end', function () {
                var resBody = Buffer.concat(chunks);
                switch (res.headers['content-type']) {
                    case 'application/json':
                        resBody = JSON.parse(resBody);
                        break;
                    case 'application/json;charset=UTF-8':
                        resBody = JSON.parse(resBody);
                        break;
                }
                resolve(resBody);
            });
        });
        req.on('error', reject);
        if (body) {
            req.write(body);
        }
        req.end();
    });
}
exports.https_generico = https_generico;
