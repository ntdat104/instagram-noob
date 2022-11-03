import { BaseUserFragment } from '~/types/generated';

export type UserWithOnlineStatus = BaseUserFragment & {
  isOnline?: boolean;
};
