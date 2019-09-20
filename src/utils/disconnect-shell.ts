import {execSync} from 'child_process';
import {device} from '../models/constants';
import {shell} from '../models/state';
import {isConnectedToDevice} from './is-connected-to-device';

export function disconnectShell() {
  if (shell()) {
    try {
      shell().stdin.write('exit\n'); // exits from su
      shell().stdin.write('exit\n'); // exits from adb shell
      shell().stdin.end();
    } catch (err) {
    }
  }
  shell(null);
  try {
    if (isConnectedToDevice()) {
      execSync(`adb disconnect ${device}`);
    }
  } catch (err) {
    // oh well.
  }
}
