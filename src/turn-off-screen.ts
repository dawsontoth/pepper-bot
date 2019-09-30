#!/usr/bin/env node
import {ensureScreenIs} from './methods/ensure-screen-is';

ensureScreenIs(false)
  .then(() => process.exit(0));
