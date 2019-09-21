#!/usr/bin/env node
import {Job, rescheduleJob} from 'node-schedule';
import {ensureScreenIs} from './methods/ensure-screen-is';
import {run} from './methods/run';
import {afterWorkHours, beforeWorkHours, duringWorkHours} from './models/timing';

const before = new Job('Turn On Screen', () => ensureScreenIs(true));
const during = new Job('Test Service', () => run());
const after = new Job('Turn Off Screen', () => ensureScreenIs(false));

rescheduleJob(before, beforeWorkHours);
rescheduleJob(during, duringWorkHours);
rescheduleJob(after, afterWorkHours);
