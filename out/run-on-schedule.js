#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_schedule_1 = require("node-schedule");
var timing_1 = require("./models/timing");
var run_1 = require("./run");
var ensure_screen_is_1 = require("./utils/ensure-screen-is");
var running = false;
var before = new node_schedule_1.Job('Turn On Screen', function () { return ensure_screen_is_1.ensureScreenIs(true); });
var during = new node_schedule_1.Job('Test Service', function () {
    if (!running) {
        running = true;
        run_1.run()
            .then(function () { return running = false; })
            .catch(function () { return running = false; });
    }
});
var after = new node_schedule_1.Job('Turn Off Screen', function () { return ensure_screen_is_1.ensureScreenIs(false); });
node_schedule_1.rescheduleJob(before, timing_1.beforeWorkHours);
node_schedule_1.rescheduleJob(during, timing_1.duringWorkHours);
node_schedule_1.rescheduleJob(after, timing_1.afterWorkHours);
//# sourceMappingURL=run-on-schedule.js.map