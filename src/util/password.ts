import bcrypt from 'bcrypt';

export function genHash(password: string) {
  const saltRounds = +process.env.PASSWORD_SALT_ROUNDS || 16;

  return bcrypt.hash(password, saltRounds);
}

export function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
