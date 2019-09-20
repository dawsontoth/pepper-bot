import {execSync} from 'child_process';
import {device} from '../models/constants';

export function isConnectedToDevice() {
  const devices = String(execSync('adb devices')).split('\n');
  for (let i = 1; i < devices.length; i++) {
    if (devices[i].indexOf(device) >= 0) {
      return devices[i].indexOf('\tdevice') >= 0;
    }
  }
  return false;
}
