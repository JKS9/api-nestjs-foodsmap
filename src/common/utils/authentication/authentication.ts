import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

import { config } from 'config/env.config';

export const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string,
) => {
  return await compare(plainTextPassword, hashedPassword);
};

export const generateAccessToken = async (userId: string) => {
  return jwt.sign({ userId: userId }, config().token, {
    expiresIn: 3600,
  });
};

export const generateRefreshToken = async () => {
  return uuid.v4();
};
