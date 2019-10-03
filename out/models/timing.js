"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_schedule_1 = require("node-schedule");
var startsAt = 9;
var endsAt = 19;
var workWeek = new node_schedule_1.Range(1, 5);
exports.beforeWorkHours = {
    dayOfWeek: workWeek,
    hour: startsAt - 1,
    minute: 58,
};
exports.duringWorkHours = {
    dayOfWeek: workWeek,
    hour: new node_schedule_1.Range(startsAt, endsAt),
};
exports.afterWorkHours = {
    dayOfWeek: workWeek,
    hour: endsAt + 1,
    minute: 1,
};
exports.everyMinute = {};
//# sourceMappingURL=timing.js.map