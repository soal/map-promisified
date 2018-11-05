"use strict";
exports.__esModule = true;
var promisifyMethod_1 = require("./promisifyMethod");
var methodsData_1 = require("./methodsData");
function default_1(map) {
    var toPromisify = Object.keys(methodsData_1["default"]);
    Object.keys(map).forEach(function (key) {
        if (toPromisify.indexOf(key) !== -1) {
            map[key] = promisifyMethod_1["default"](map, key);
        }
    });
    return map;
}
exports["default"] = default_1;
