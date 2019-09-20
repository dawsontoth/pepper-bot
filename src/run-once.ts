#!/usr/bin/env node
import {run} from './run';
import {delay} from './utils/delay';
import {ensureScreenIs} from './utils/ensure-screen-is';

ensureScreenIs(true)
  .then(() => run())
  .then(() => delay(40))
  .then(() => ensureScreenIs(false));
