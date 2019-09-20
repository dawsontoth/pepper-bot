import {Range} from 'node-schedule';

const startsAt = 9;
const endsAt = 19;
const workWeek = new Range(1, 5);

export const beforeWorkHours = {
  dayOfWeek: workWeek,
  hour: startsAt - 1,
  minute: 58,
};

export const duringWorkHours = {
  dayOfWeek: workWeek,
  hour: new Range(startsAt, endsAt),
};

export const afterWorkHours = {
  dayOfWeek: workWeek,
  hour: endsAt + 1,
  minute: 1,
};
