import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

export const getUser = (token: string) => {
  if (token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw new AuthenticationError('Invalid token');
    }
  }
  return null;
};

// Helper to generate token (for testing purposes)
export const generateToken = (user: any) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
};
