import {execSync, spawn} from 'child_process';
import {device} from '../models/constants';
import {shell} from '../models/state';
import {isConnectedToDevice} from './is-connected-to-device';

export function connectShell() {
  if (!isConnectedToDevice()) {
    execSync(`adb connect ${device}`);
  }
  if (!shell()) {
    shell(spawn('adb', ['shell']));
    shell().stdin.write(`su\n`);
  }
}
