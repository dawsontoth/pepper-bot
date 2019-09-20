#!/usr/bin/env node
import {Job, rescheduleJob} from 'node-schedule';
import {afterWorkHours, beforeWorkHours, duringWorkHours} from './models/timing';
import {run} from './run';
import {ensureScreenIs} from './utils/ensure-screen-is';

let running = false;
const before = new Job('Turn On Screen', () => ensureScreenIs(true));
const during = new Job('Test Service', () => {
  if (!running) {
    running = true;
    run()
      .then(() => running = false)
      .catch(() => running = false);
  }
});
const after = new Job('Turn Off Screen', () => ensureScreenIs(false));

rescheduleJob(before, beforeWorkHours);
rescheduleJob(during, duringWorkHours);
rescheduleJob(after, afterWorkHours);
