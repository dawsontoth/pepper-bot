"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var constants_1 = require("../models/constants");
function isConnectedToDevice() {
    var devices = String(child_process_1.execSync('adb devices')).split('\n');
    for (var i = 1; i < devices.length; i++) {
        if (devices[i].indexOf(constants_1.device) >= 0) {
            return devices[i].indexOf('\tdevice') >= 0;
        }
    }
    return false;
}
exports.isConnectedToDevice = isConnectedToDevice;
//# sourceMappingURL=is-connected-to-device.js.map