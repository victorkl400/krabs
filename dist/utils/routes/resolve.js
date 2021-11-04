"use strict";
exports.__esModule = true;
exports.resolveRoutes = void 0;
function resolveRoutes(tenantName, pathname) {
    if (pathname[1] === '_') {
        return "/shared/" + pathname.substring(2);
    }
    return pathname === '/' ? "/" + tenantName : "/" + tenantName + pathname;
}
exports.resolveRoutes = resolveRoutes;
exports["default"] = resolveRoutes;
