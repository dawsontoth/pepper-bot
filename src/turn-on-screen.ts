#!/usr/bin/env node
import {disconnectShell} from './methods/disconnect-shell';
import {ensureScreenIs} from './methods/ensure-screen-is';

ensureScreenIs(true)
  .then(disconnectShell)
  .then(() => process.exit(0));
