"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance = null;
function shell(val) {
    if (val !== undefined) {
        instance = val;
    }
    return instance;
}
exports.shell = shell;
//# sourceMappingURL=state.js.map