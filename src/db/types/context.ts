import { NextApiRequest, NextApiResponse } from 'next';

export interface Context {
  req: NextApiRequest & { userId: string; accessToken?: string };
  res: NextApiResponse;
}
