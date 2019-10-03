#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_schedule_1 = require("node-schedule");
var run_1 = require("./methods/run");
var timing_1 = require("./models/timing");
var testService = new node_schedule_1.Job('Test Service', function () { return run_1.run(); });
node_schedule_1.rescheduleJob(testService, timing_1.everyMinute);
//# sourceMappingURL=run-constantly.js.map