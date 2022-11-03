import { useStoreSelector } from './store';

export const usePostSelector = () => useStoreSelector((state) => state.post);

export const useAuthSelector = () => useStoreSelector((state) => state.auth);

export const useUserSelector = () => useStoreSelector((state) => state.user);

export const useCommentSelector = () => useStoreSelector((state) => state.comment);

export const useConversationSelector = () => useStoreSelector((state) => state.conversation);
