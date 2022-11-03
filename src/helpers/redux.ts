import { destroyCookie } from 'nookies';

import { postSlice } from '../redux/slices/postSlice';

export const subTrees = {
  selectedPost: `${postSlice.name}.selectedPost`,
};

export const removeSubTree = (subTreeKey: string) => destroyCookie(null, subTreeKey);
