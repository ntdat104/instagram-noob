import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '~/constants';

const hashData = (data: string): string => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  return bcrypt.hashSync(data.toString(), salt);
};

export default hashData;
