export const SALT_ROUNDS = 10;

export const __prod__ = process.env.NODE_ENV === 'production';

export const __client__ = typeof window !== 'undefined';
