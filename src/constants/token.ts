export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  PREV_ROUTE: 'prev_route',
};

export const SECRETS = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET,
};

export const EXPIRES = {
  ACCESS_TOKEN: 7 * 24 * 60 * 60, // 7 days (by seconds)
  REFRESH_TOKEN: 14 * 24 * 60 * 60, // 14 days (by seconds)
};
