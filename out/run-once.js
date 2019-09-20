#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var run_1 = require("./run");
var delay_1 = require("./utils/delay");
var ensure_screen_is_1 = require("./utils/ensure-screen-is");
ensure_screen_is_1.ensureScreenIs(true)
    .then(function () { return run_1.run(); })
    .then(function () { return delay_1.delay(40); })
    .then(function () { return ensure_screen_is_1.ensureScreenIs(false); });
//# sourceMappingURL=run-once.js.map