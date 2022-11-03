// types
import { CookieSerializeOptions } from 'cookie';

const cookieConfig: CookieSerializeOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};

export default cookieConfig;
