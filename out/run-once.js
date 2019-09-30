#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ensure_screen_is_1 = require("./methods/ensure-screen-is");
var run_1 = require("./methods/run");
ensure_screen_is_1.ensureScreenIs(true)
    .then(function () { return run_1.run(); })
    .then(function () { return process.exit(0); });
//# sourceMappingURL=run-once.js.map