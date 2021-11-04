"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.findTenant = void 0;
var env_1 = require("../env");
function findTenant(tenants, hostname) {
    return tenants.find(function (tenant) {
        var domains = tenant.domains.reduce(function (acc, current) {
            var _a;
            var currentEnvDomains = (_a = current === null || current === void 0 ? void 0 : current[env_1.safeEnv]) !== null && _a !== void 0 ? _a : {};
            return __spreadArray(__spreadArray([], acc, true), [currentEnvDomains], false);
        }, []);
        if (domains.includes(hostname)) {
            return true;
        }
        else {
            var regexDomains = domains.filter(function (domain) { return domain instanceof RegExp; });
            var match = regexDomains.map(function (domain) { return domain.test(hostname); }).filter(Boolean);
            return match.length;
        }
    });
}
exports.findTenant = findTenant;
exports["default"] = findTenant;
