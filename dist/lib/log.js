"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degublog = exports.DegubLog = void 0;
var debug = true;
function DegubLog(dado) {
    if (Boolean(debug) === true)
        console.log(dado);
}
exports.DegubLog = DegubLog;
function degublog(dado) {
    DegubLog(dado);
}
exports.degublog = degublog;
