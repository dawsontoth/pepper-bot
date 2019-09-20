"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var constants_1 = require("../models/constants");
var state_1 = require("../models/state");
var is_connected_to_device_1 = require("./is-connected-to-device");
function connectShell() {
    if (!is_connected_to_device_1.isConnectedToDevice()) {
        child_process_1.execSync("adb connect " + constants_1.device);
    }
    if (!state_1.shell()) {
        state_1.shell(child_process_1.spawn('adb', ['shell']));
        state_1.shell().stdin.write("su\n");
    }
}
exports.connectShell = connectShell;
//# sourceMappingURL=connect-shell.js.map