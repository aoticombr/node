"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProperty = exports.setQueryJson = exports.ApplyStatus = exports.Update_Query = exports.Insert_Query = exports.Simple_Insert_Query = exports.Simple_Query = exports.Post_Query = exports.Query = exports.ExecCommand = exports.Connect = exports.CommitTransaction = exports.RollBackTransaction = exports.StartTransaction = exports.getLimit = exports.getFiltros = exports.getConvertQry = void 0;
var log_1 = require("./log");
var pg_1 = require("pg");
var consts_1 = require("../constantes/consts");
var typeHandlers = {
    parse: function (value) {
        return parseFloat(value);
    },
    // Opcionalmente, voc� pode definir a fun��o de formata��o tamb�m
    format: function (value) {
        return String(value);
    },
};
pg_1.types.setTypeParser(1700, typeHandlers.parse);
function getConvertQry(filt) {
    var qr = '';
    for (var index in filt) {
        var json = filt[index];
        var campo = json.campo;
        var tipo = json.tipo;
        var valor = json.valor;
        if (valor) {
            if (tipo == '=') {
                qr += " and upper(".concat(campo, ") =    upper('").concat(valor, "') ");
            } //com upper e aspas
            else if (tipo == '==') {
                qr += " and       ".concat(campo, "  =           '").concat(valor, "'");
            } //com aspas
            else if (tipo == '===') {
                qr += " and       ".concat(campo, "  =           ").concat(valor);
            } //sem nada
            else if (tipo == '=%') {
                qr += " and upper(".concat(campo, ") like upper('").concat(valor, "%')");
            }
            else if (tipo == '%=') {
                qr += " and upper(".concat(campo, ") like upper('%").concat(valor, "')");
            }
            else if (tipo == '%=%') {
                qr += " and upper(".concat(campo, ") like upper('%").concat(valor, "%') ");
            }
            else if (tipo == '>=') {
                qr += " and ".concat(campo, " >= '").concat(valor, "' ");
            }
            else if (tipo == '<=') {
                qr += " and ".concat(campo, " <='").concat(valor, "' ");
            }
            else if (tipo == 'in') {
                qr += " and ".concat(campo, " in ('").concat(valor.join(', '), "') ");
            }
            else
                qr += " and upper(".concat(campo, ") like upper('").concat(valor, "%') ");
        }
    }
    return qr;
}
exports.getConvertQry = getConvertQry;
function getFiltros(req) {
    if (req.body.filtros == null) {
        return '';
    }
    else {
        return getConvertQry(req.body.filtros);
    }
}
exports.getFiltros = getFiltros;
function getLimit(req) {
    if (req.body.limit == null) {
        return 50;
    }
    else {
        return req.body.limit;
    }
}
exports.getLimit = getLimit;
function StartTransaction(client) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    (0, log_1.degublog)('BEGIN');
                    return [4 /*yield*/, client.query('BEGIN')];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.StartTransaction = StartTransaction;
function RollBackTransaction(erro, client) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    (0, log_1.degublog)('ROLLBACK');
                    (0, log_1.degublog)(erro);
                    return [4 /*yield*/, client.query('ROLLBACK')];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    error_2 = _a.sent();
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.RollBackTransaction = RollBackTransaction;
function CommitTransaction(client) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    (0, log_1.degublog)('COMMIT');
                    return [4 /*yield*/, client.query('COMMIT')];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    error_3 = _a.sent();
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.CommitTransaction = CommitTransaction;
function Connect( //ppool:any
) {
    return __awaiter(this, void 0, void 0, function () {
        var ppool, conn, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    ppool = new pg_1.Pool(consts_1.DB_PG);
                    (0, log_1.degublog)('-------------------connect--------begin-----0----');
                    return [4 /*yield*/, ppool.connect()];
                case 1:
                    conn = _a.sent();
                    (0, log_1.degublog)('-------------------connect--------begin-----1----');
                    return [4 /*yield*/, ExecCommand("SET TIMEZONE TO 'America/Sao_Paulo'", conn)];
                case 2:
                    _a.sent();
                    (0, log_1.degublog)('-------------------connect--------begin-----3----');
                    return [4 /*yield*/, Query(conn, 'SHOW TIMEZONE;', false)];
                case 3:
                    _a.sent();
                    (0, log_1.degublog)('-------------------connect--------begin-----4----');
                    return [2 /*return*/, conn];
                case 4:
                    error_4 = _a.sent();
                    (0, log_1.degublog)('-------------------connect--------erro---------');
                    (0, log_1.degublog)(error_4);
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Connect = Connect;
function ExecCommand(sql, client) {
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    (0, log_1.degublog)('-------------------ExecCommand--------begin---------');
                    (0, log_1.degublog)(sql);
                    return [4 /*yield*/, client.query(sql)];
                case 1:
                    _a.sent();
                    (0, log_1.degublog)('-------------------ExecCommand--------end---------');
                    return [2 /*return*/, true];
                case 2:
                    error_5 = _a.sent();
                    throw error_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.ExecCommand = ExecCommand;
function Query(conn, sql, close) {
    if (close === void 0) { close = true; }
    return __awaiter(this, void 0, void 0, function () {
        var results, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    (0, log_1.degublog)('-------------------Query--------begin----0-----');
                    return [4 /*yield*/, conn.query(sql)];
                case 1:
                    results = _a.sent();
                    (0, log_1.degublog)('-------------------Query--------begin----1-----');
                    if (!(close === true)) return [3 /*break*/, 3];
                    (0, log_1.degublog)('-------------------Query--------begin----end 1-----');
                    return [4 /*yield*/, conn.end()];
                case 2:
                    _a.sent();
                    (0, log_1.degublog)('-------------------Query--------begin----end 2-----');
                    _a.label = 3;
                case 3:
                    (0, log_1.degublog)('-------------------Query--------end---------');
                    return [2 /*return*/, results.rows];
                case 4:
                    ex_1 = _a.sent();
                    throw ex_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Query = Query;
function Post_Query(select, filt, plimit, res, next) {
    if (plimit === void 0) { plimit = 50; }
    return __awaiter(this, void 0, void 0, function () {
        var conn, where, limit, sql, results, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Connect()];
                case 1:
                    conn = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    where = ' where 1=1 ';
                    limit = '';
                    if (plimit > 0)
                        limit = ' limit ' + plimit.toString();
                    sql = select + where + filt + limit;
                    return [4 /*yield*/, Query(conn, sql, true)];
                case 3:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
                case 4:
                    error_6 = _a.sent();
                    next(error_6);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Post_Query = Post_Query;
function Simple_Query(sql, close) {
    if (close === void 0) { close = true; }
    return __awaiter(this, void 0, void 0, function () {
        var conn, result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, log_1.degublog)('------Simple_Query------begin-');
                    return [4 /*yield*/, Connect()];
                case 1:
                    conn = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    (0, log_1.degublog)(sql);
                    return [4 /*yield*/, Query(conn, sql, close)];
                case 3:
                    result = _a.sent();
                    (0, log_1.degublog)('------Simple_Query-----end--');
                    return [2 /*return*/, result];
                case 4:
                    error_7 = _a.sent();
                    conn.end();
                    throw error_7;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.Simple_Query = Simple_Query;
function Simple_Insert_Query(sql) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Connect( //pool
                    )];
                case 1:
                    conn = _a.sent();
                    (0, log_1.degublog)('Connect');
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 7, 8]);
                    (0, log_1.degublog)('-----------Simple_Insert_Query-----begin-----');
                    return [4 /*yield*/, StartTransaction(conn)];
                case 3:
                    _a.sent(); //degublog('StartTransaction'); 
                    return [4 /*yield*/, ExecCommand(sql, conn)];
                case 4:
                    _a.sent(); //degublog('ExecCommand',sql); 
                    return [4 /*yield*/, CommitTransaction(conn)];
                case 5:
                    _a.sent(); //degublog('CommitTransaction close'); 
                    //await 
                    (0, log_1.degublog)('-----------Simple_Insert_Query-----end-----');
                    return [3 /*break*/, 8];
                case 6:
                    error_8 = _a.sent();
                    conn.end();
                    throw error_8;
                case 7:
                    conn.end();
                    return [2 /*return*/, true];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.Simple_Insert_Query = Simple_Insert_Query;
function Insert_Query(sql, req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Connect( //pool
                    )];
                case 1:
                    conn = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 7, 8]);
                    (0, log_1.degublog)('----------Insert_Query-----begin------' + req.url);
                    return [4 /*yield*/, StartTransaction(conn)];
                case 3:
                    _a.sent();
                    (0, log_1.degublog)('StartTransaction');
                    return [4 /*yield*/, ExecCommand(sql, conn)];
                case 4:
                    _a.sent();
                    (0, log_1.degublog)('ExecCommand');
                    return [4 /*yield*/, CommitTransaction(conn)];
                case 5:
                    _a.sent();
                    (0, log_1.degublog)('CommitTransaction close');
                    // await 
                    (0, log_1.degublog)('----------Insert_Query-----end------');
                    return [3 /*break*/, 8];
                case 6:
                    error_9 = _a.sent();
                    next(error_9);
                    return [3 /*break*/, 8];
                case 7:
                    conn.end();
                    (0, log_1.degublog)('end');
                    return [2 /*return*/, res.status(201).json({ code: '', message: 'record inserted' })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.Insert_Query = Insert_Query;
function Update_Query(//pool:any, 
sql, req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Connect( //pool
                    )];
                case 1:
                    conn = _a.sent();
                    (0, log_1.degublog)('Connect');
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 7, 8]);
                    (0, log_1.degublog)('----------Update_Query------begin-----' + req.url);
                    return [4 /*yield*/, StartTransaction(conn)];
                case 3:
                    _a.sent();
                    (0, log_1.degublog)('StartTransaction');
                    return [4 /*yield*/, ExecCommand(sql, conn)];
                case 4:
                    _a.sent();
                    (0, log_1.degublog)('ExecCommand');
                    return [4 /*yield*/, CommitTransaction(conn)];
                case 5:
                    _a.sent();
                    (0, log_1.degublog)('CommitTransaction close');
                    // await conn.end(); degublog('end');  
                    (0, log_1.degublog)('----------Update_Query------end-----');
                    return [3 /*break*/, 8];
                case 6:
                    error_10 = _a.sent();
                    next(error_10);
                    return [3 /*break*/, 8];
                case 7:
                    conn.end();
                    (0, log_1.degublog)('end');
                    return [2 /*return*/, res.status(201).json({ code: '', message: 'record update' })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.Update_Query = Update_Query;
function ApplyStatus(itens, status) {
    if (itens === void 0) { itens = {}; }
    var y = 0;
    for (y = 0; y < itens.length; y++) {
        itens[y]["row_status"] = status;
    }
}
exports.ApplyStatus = ApplyStatus;
function setQueryJson(sql, property, cabs) {
    return __awaiter(this, void 0, void 0, function () {
        var x, cab, query, itens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('export async function setQueryJson(....');
                    x = 0;
                    cab = [];
                    x = 0;
                    _a.label = 1;
                case 1:
                    if (!(x < cabs.length)) return [3 /*break*/, 4];
                    console.log('export async function setQueryJson(....' + x);
                    cab = cabs[x];
                    query = {
                        text: sql,
                        values: [cab["id"]],
                        rowMode: 'field',
                    };
                    cab[property] = [];
                    return [4 /*yield*/, Simple_Query(query)];
                case 2:
                    itens = _a.sent();
                    ApplyStatus(itens, 'old');
                    cab[property] = itens; //inserir itens no cabe?alho
                    _a.label = 3;
                case 3:
                    x++;
                    return [3 /*break*/, 1];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.setQueryJson = setQueryJson;
function setProperty(modulo, sql, json) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setQueryJson(sql, 'rows_' + modulo, json)];
                case 1:
                    _a.sent();
                    //}
                    console.log('json....');
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    });
}
exports.setProperty = setProperty;
