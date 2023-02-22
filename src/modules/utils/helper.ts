import { compareSync, hashSync } from 'bcrypt';

const prettyPrintSeconds = (time: string): string => {
  const ntime = Number(time);
  const hours = Math.floor(ntime / 3600);
  const minutes = Math.floor((ntime % 3600) / 60);
  const seconds = Math.floor((ntime % 3600) % 60);

  return `${hours > 0 ? hours + (hours === 1 ? ' hour,' : ' hours,') : ''} ${
    minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''
  } ${seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : ''}`;
};

const saltRound = 10;

const encryptPassword = (password: string) => {
  return hashSync(password, saltRound);
};

const comparePassword = (input: string, hashed: string) => {
  return compareSync(input, hashed);
};

export { prettyPrintSeconds, saltRound, encryptPassword, comparePassword };
