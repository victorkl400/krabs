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
var url_1 = require("url");
var path = require("path");
var config_1 = require("../utils/config");
var findTenant_1 = require("../utils/tenants/findTenant");
var resolve_1 = require("../utils/routes/resolve");
var env_1 = require("../utils/env");
if (!env_1.currentEnv) {
    console.warn(env_1.environmentWarningMessage);
}
function krabs(req, res, handle, app, config) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, tenants, enableVhostHeader, _b, hostname, vhostHeader, host, parsedUrl, _c, pathname, query, tenant, APIPath, APIhandler, route;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(config !== null && config !== void 0)) return [3 /*break*/, 1];
                    _b = config;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (0, config_1.getTenantConfig)()];
                case 2:
                    _b = (_d.sent());
                    _d.label = 3;
                case 3:
                    _a = _b, tenants = _a.tenants, enableVhostHeader = _a.enableVhostHeader;
                    hostname = req.hostname;
                    vhostHeader = enableVhostHeader && req.headers['x-vhost'];
                    host = vhostHeader || hostname;
                    parsedUrl = (0, url_1.parse)(req.url, true);
                    _c = parsedUrl.pathname, pathname = _c === void 0 ? '/' : _c, query = parsedUrl.query;
                    tenant = (0, findTenant_1["default"])(tenants, host);
                    if (!tenant) {
                        res.status(500);
                        res.end();
                        return [2 /*return*/];
                    }
                    if (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/_next')) {
                        handle(req, res);
                        return [2 /*return*/];
                    }
                    if (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/api/')) {
                        try {
                            APIPath = pathname.replace(/^\/api\//, '');
                            APIhandler = require(path.join(process.cwd(), "pages/" + tenant.name + "/api/" + APIPath))["default"];
                            APIhandler(req, res);
                        }
                        catch (_) {
                            handle(req, res);
                        }
                        return [2 /*return*/];
                    }
                    route = (0, resolve_1["default"])(tenant.name, String(pathname));
                    if (route) {
                        // @ts-ignore
                        req.tenant = tenant;
                        app.render(req, res, route, query);
                        return [2 /*return*/];
                    }
                    handle(req, res);
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = krabs;
