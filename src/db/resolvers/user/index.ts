import { Resolver } from 'type-graphql';

import extender from '~/helpers/extender';

// sub resolvers
import followUser from './followUser';
import getProfile from './getProfile';
import getSuggestions from './getSuggestions';
import searchUser from './searchUser';
import addAvatar from './addAvatar';
import updateAvatar from './updateAvatar';

@Resolver()
export default class UserResolver extends extender(
  searchUser,
  followUser,
  getProfile,
  getSuggestions,
  addAvatar,
  updateAvatar,
) {}
