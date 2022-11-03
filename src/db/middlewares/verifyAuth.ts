import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';

// types
import { Context } from '~/db/types/context';

import { SECRETS } from '~/constants';
import { User } from '../models';
import { clearAllCookies } from '~/helpers/cookie';
import { sendAccessToken } from '~/helpers/token';

interface JwtPayloadSigned extends jwt.JwtPayload {
  userId: string;
}

export const verifyAuth: MiddlewareFn<Context> = async ({ context: { req, res } }, next) => {
  const { access_token, refresh_token } = req.cookies;
  const { ACCESS_TOKEN, REFRESH_TOKEN } = SECRETS;

  if (!ACCESS_TOKEN || !REFRESH_TOKEN) throw new Error('Missing secret token');

  if (!access_token || !refresh_token)
    return {
      code: 401,
      success: false,
      message: 'Token is missing',
    };

  try {
    const { userId } = jwt.verify(access_token, ACCESS_TOKEN) as JwtPayloadSigned;

    const user = await User.findById(userId);

    if (!user)
      return {
        code: 404,
        success: false,
        message: 'User not found',
      };

    req.userId = userId;

    return next();
  } catch (error) {
    return jwt.verify(refresh_token, REFRESH_TOKEN, async (err, decoded) => {
      if (err) {
        clearAllCookies(res);

        return {
          code: 401,
          success: false,
          message: 'Invalid or expired refresh token',
        };
      }

      const { userId } = decoded as any;

      const user = await User.findById(userId);

      if (!user)
        return {
          code: 404,
          success: false,
          message: 'User not found',
        };

      const accessToken = sendAccessToken(res, userId);

      req.userId = userId;
      req.accessToken = accessToken;

      return next();
    });
  }
};
