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
        while (_) try {
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
exports.__esModule = true;
var route_resolver_1 = require("./route-resolver");
function getMessage() {
    var route = route_resolver_1.getRoute();
    switch (route) {
        case 'pi':
            //I am on PI page
            break;
        case 'add':
            //I am on ADD page
            break;
        case 'view':
            renderView();
            break;
        case 'current-session':
            renderCurrentSession();
            break;
        default:
            return;
    }
}
function renderCurrentSession() {
    return __awaiter(this, void 0, void 0, function () {
        var response, visitors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/current-session')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    visitors = _a.sent();
                    renderTable(visitors.map(function (visitor) {
                        var visitorText = {};
                        for (var key in visitor) {
                            if (!visitor.hasOwnProperty(key)) {
                                return;
                            }
                            else if (key instanceof Date) {
                                visitorText[key] = visitor[key].getHours() + ':' + visitor[key].getMinutes();
                            }
                            else {
                                visitorText[key] = visitor[key].toString();
                            }
                        }
                        return visitorText;
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
function getSearchParams() {
    var query = location.search.replace('?', '').split('&');
    var result = {};
    query.forEach(function (queryPart) {
        var pair = queryPart.split('=');
        result[pair[0]] = pair[1];
    });
    return result;
}
function renderView() {
    return __awaiter(this, void 0, void 0, function () {
        var params, response, visitors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = getSearchParams();
                    return [4 /*yield*/, fetch("/period/?month=" + params.month + "&year=" + params.year)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    visitors = _a.sent();
                    renderTable(visitors.map(function (visitor) {
                        var visitorText = {};
                        for (var key in visitor) {
                            if (!visitor.hasOwnProperty(key)) {
                                return;
                            }
                            else if (key instanceof Date) {
                                visitorText[key] = visitor[key].getHours() + ':' + visitor[key].getMinutes();
                            }
                            else {
                                visitorText[key] = visitor[key].toString();
                            }
                        }
                        return visitorText;
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
function renderTable(tableData) {
    if (!tableData.length) {
        throw new Error('No table data!');
    }
    var table = document.getElementById('entries');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var headers = Object.keys(tableData[0]);
    headers.forEach(function (header) {
        var th = document.createElement('th');
        th.textContent = header;
        thead.appendChild(th);
    });
    tableData.forEach(function (tableRow) {
        var tr = document.createElement('tr');
        var values = Object.values(tableRow);
        values.forEach(function (value) {
            var td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.innerHTML = '';
    table.appendChild(thead);
    table.appendChild(tbody);
}
