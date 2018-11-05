"use strict";
exports.__esModule = true;
var promisifyMap_1 = require("./promisifyMap");
var promisifyMethod_1 = require("./promisifyMethod");
function promisify(map, methodName) {
    if (methodName === void 0) { methodName = null; }
    if (methodName) {
        return promisifyMethod_1["default"](map, methodName);
    }
    else {
        return promisifyMap_1["default"](map);
    }
}
exports["default"] = promisify;
