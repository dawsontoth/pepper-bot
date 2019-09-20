import {execSync} from 'child_process';

export function screenIsOn() {
  return String(execSync(`adb shell dumpsys power`)).indexOf('mWakefulness=Awake') >= 0;
}
