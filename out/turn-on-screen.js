#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disconnect_shell_1 = require("./methods/disconnect-shell");
var ensure_screen_is_1 = require("./methods/ensure-screen-is");
ensure_screen_is_1.ensureScreenIs(true)
    .then(disconnect_shell_1.disconnectShell);
//# sourceMappingURL=turn-on-screen.js.map