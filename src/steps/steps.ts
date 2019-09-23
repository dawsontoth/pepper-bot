import {connectShell} from '../methods/connect-shell';
import {packageName} from '../models/constants';
import {shell} from '../models/state';
import {IStep} from '../models/step';

export const steps: IStep[] = [
  {
    title: `Connect ADB`,
    run: async () => connectShell(),
  },
  {
    title: 'Switching to Library',
    run: async () => shell().stdin.write('input tap 1200 1070\n'),
    waitAfterRun: 6,
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
      shell().stdin.write(`am force-stop ${packageName}\n`
        + `monkey -p ${packageName} -c android.intent.category.LAUNCHER 1\n`,
      );
    },
  },
];
