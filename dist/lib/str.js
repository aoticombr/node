"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyNull1 = exports.EmptyNull = exports.QuotedStr2 = exports.QuotedStr1 = void 0;
function QuotedStr1(pStr) {
    return "'" + pStr + "'";
}
exports.QuotedStr1 = QuotedStr1;
function QuotedStr2(pStr) {
    return '"' + pStr + '"';
}
exports.QuotedStr2 = QuotedStr2;
function EmptyNull(value) {
    if (!value)
        return 'null';
    return value;
}
exports.EmptyNull = EmptyNull;
function EmptyNull1(value) {
    if ((typeof (value) == "number") && ((value == null) || (value == undefined)))
        return 'null';
    if ((typeof (value) != "number") && !value)
        return 'null';
    return QuotedStr1(value);
}
exports.EmptyNull1 = EmptyNull1;
