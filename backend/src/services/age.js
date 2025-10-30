import dayjs from 'dayjs';

export function calcAge(dob, at = new Date()) {
  const birth = dayjs(dob);
  const today = dayjs(at);
  let age = today.year() - birth.year();
  if (today.month() < birth.month() || (today.month() === birth.month() && today.date() < birth.date())) {
    age--;
  }
  return age;
}
