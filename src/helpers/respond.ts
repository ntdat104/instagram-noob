// types
import { BaseResponse } from '~/db/types/shared';

const respond = <T>(handler: () => Promise<T>): Promise<T | BaseResponse> => {
  try {
    return handler();
  } catch (err: any) {
    return Promise.resolve({
      code: 500,
      success: false,
      message: 'Internal server error ' + err.message,
    });
  }
};

export default respond;
