"use strict";
var _a;
exports.__esModule = true;
exports.environmentWarningMessage = exports.safeEnv = exports.currentEnv = void 0;
exports.currentEnv = (_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV;
exports.safeEnv = exports.currentEnv !== null && exports.currentEnv !== void 0 ? exports.currentEnv : 'development';
exports.environmentWarningMessage = [
    "\n\u26A0\uFE0F   " + 'Warning' + "\n",
    "The " + 'NODE_ENV' + " environment variable is " + 'undefined' + ".",
    "Krabs will run in " + exports.safeEnv + " mode, meaning",
    "it will only serve tenants domains set as " + exports.safeEnv + " domains.\n",
].join('\n');
