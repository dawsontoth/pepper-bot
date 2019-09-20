import {connectShell} from '../utils/connect-shell';
import {disconnectShell} from '../utils/disconnect-shell';
import {packageName} from './constants';
import {shell} from './state';
import {IStep} from './step';

export const steps: IStep[] = [
  {
    title: `Connect ADB`,
    run: async () => connectShell(),
  },
  {
    title: 'Switching to Library',
    run: async () => shell().stdin.write('input tap 1200 1070\n'),
    waitAfterRun: 5,
  },
  {
    title: 'Open a Trainer',
    run: async () => shell().stdin.write('input tap 1218 850\n'),
    waitAfterRun: 10,
  },
  {
    title: 'Open a Program',
    run: async () => shell().stdin.write('input tap 1218 850\n'),
    waitAfterRun: 9,
  },
  {
    title: `Restarting App`,
    run: async () => {
      // const pid = String(execSync(`adb shell ps | grep ${packageName} | awk '{print $2}'`));
      // if (!pid || isNaN(+pid)) {
      //   throw new Error('pid not found! ' + pid);
      // }
      shell().stdin.write(`am force-stop ${packageName}\n`
        + `monkey -p ${packageName} -c android.intent.category.LAUNCHER 1\n`,
      );
    },
  },
  {
    title: `Disconnect ADB`,
    run: async () => disconnectShell(),
  },
];
