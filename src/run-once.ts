#!/usr/bin/env node
import {ensureScreenIs} from './methods/ensure-screen-is';
import {run} from './methods/run';

ensureScreenIs(true)
  .then(() => run())
  .then(() => process.exit(0));
