#!/usr/bin/env node
import {Job, rescheduleJob} from 'node-schedule';
import {run} from './methods/run';
import {everyMinute} from './models/timing';

const testService = new Job('Test Service', () => run());

rescheduleJob(testService, everyMinute);
