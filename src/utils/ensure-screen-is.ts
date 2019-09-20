import {Keys} from '../models/keys';
import {shell} from '../models/state';
import {connectShell} from './connect-shell';
import {disconnectShell} from './disconnect-shell';
import {screenIsOn} from './screen-is-on';

export async function ensureScreenIs(on: boolean) {
  await connectShell();
  if (on !== screenIsOn()) {
    shell().stdin.write(`input keyevent ${Keys.POWER}\n`);
  }
  if (!on) {
    await disconnectShell();
  }
}
