"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var constants_1 = require("../models/constants");
var state_1 = require("../models/state");
var is_connected_to_device_1 = require("./is-connected-to-device");
function disconnectShell() {
    if (state_1.shell()) {
        try {
            state_1.shell().stdin.write('exit\n'); // exits from su
            state_1.shell().stdin.write('exit\n'); // exits from adb shell
            state_1.shell().stdin.end();
        }
        catch (err) {
        }
    }
    state_1.shell(null);
    try {
        if (is_connected_to_device_1.isConnectedToDevice()) {
            child_process_1.execSync("adb disconnect " + constants_1.device);
        }
    }
    catch (err) {
        // oh well.
    }
}
exports.disconnectShell = disconnectShell;
//# sourceMappingURL=disconnect-shell.js.map