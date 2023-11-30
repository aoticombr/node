"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtaToTextBr2 = exports.DtaToTextEng = exports.DtaToTextBr = void 0;
function DtaToTextBr(pdata) {
    var vdata = new Date(pdata);
    var mm = vdata.getMonth() + 1;
    var dd = vdata.getDate();
    var yy = vdata.getFullYear();
    if (!pdata)
        return '';
    return dd.toString().padStart(2, '0') + '/' + mm.toString().padStart(2, '0') + '/' + yy;
}
exports.DtaToTextBr = DtaToTextBr;
function DtaToTextEng(pdata) {
    var vdata = new Date(pdata);
    var mm = vdata.getMonth() + 1;
    var dd = vdata.getDate();
    var yy = vdata.getFullYear();
    if (!pdata)
        return '';
    return yy + '-' + mm.toString().padStart(2, '0') + '-' + dd.toString().padStart(2, '0');
}
exports.DtaToTextEng = DtaToTextEng;
function DtaToTextBr2(pdata) {
    var vdata = new Date(pdata);
    return vdata.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}
exports.DtaToTextBr2 = DtaToTextBr2;
