"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function screenIsOn() {
    return String(child_process_1.execSync("adb shell dumpsys power")).indexOf('mWakefulness=Awake') >= 0;
}
exports.screenIsOn = screenIsOn;
//# sourceMappingURL=screen-is-on.js.map