import { createContext, ReactNode, useContext, useState } from 'react';

// types
import { Callback } from '~/types/utils';

import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';

import ModalPostActions from '~/components/Modal/ModalPostActions';
import ModalPostCreator from '~/components/Modal/ModalPostCreator';
import ModalPostDetail from '~/components/Modal/ModalPostDetail';
import ModalCommentActions from '~/components/Modal/ModalCommentActions';
import ModalNewMessage from '~/components/Modal/ModalNewMessage';
import ModalUnfollow from '~/components/Modal/ModalUnfollow';
import ToastContainer from '~/components/Toast/ToastContainer';

interface ModalInitState {
  modalTypes: ModalType[];
  showModal: (modalType: ModalType, callback?: Callback) => void;
  hideModal: (modalType: ModalType | ModalType[], callback?: Callback) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export type ModalType = keyof typeof MODAL_TYPES;

export const MODAL_TYPES = {
  POST_CREATOR: 'POST_CREATOR',
  POST_DETAIL: 'POST_DETAIL',
  POST_ACTIONS: 'POST_ACTIONS',
  COMMENT_ACTIONS: 'COMMENT_ACTIONS',
  NEW_MESSAGE: 'NEW_MESSAGE',
  UNFOLLOW: 'UNFOLLOW',
} as const;

const MODALS = {
  [MODAL_TYPES.POST_CREATOR]: <ModalPostCreator key={MODAL_TYPES.POST_CREATOR} />,
  [MODAL_TYPES.POST_DETAIL]: <ModalPostDetail key={MODAL_TYPES.POST_DETAIL} />,
  [MODAL_TYPES.POST_ACTIONS]: <ModalPostActions key={MODAL_TYPES.POST_ACTIONS} />,
  [MODAL_TYPES.COMMENT_ACTIONS]: <ModalCommentActions key={MODAL_TYPES.COMMENT_ACTIONS} />,
  [MODAL_TYPES.NEW_MESSAGE]: <ModalNewMessage key={MODAL_TYPES.NEW_MESSAGE} />,
  [MODAL_TYPES.UNFOLLOW]: <ModalUnfollow key={MODAL_TYPES.UNFOLLOW} />,
} as const;

const ModalContext = createContext<ModalInitState>({
  modalTypes: [],
  showModal: () => null,
  hideModal: () => null,
});

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalTypes, setModalTypes] = useState<ModalType[]>([]);

  const dispatch = useStoreDispatch();

  const showModal = (modalType: ModalType, callback?: Callback) => {
    setModalTypes([...modalTypes, modalType]);

    if (callback) callback();
  };

  const hideModal = (modalType: ModalType | ModalType[], callback?: Callback) => {
    if (Array.isArray(modalType))
      setModalTypes(modalTypes.filter((type) => !modalType.includes(type)));
    else setModalTypes(modalTypes.filter((type) => type !== modalType));

    dispatch(postActions.setCurrentAction(null));

    if (callback) callback();
  };

  return (
    <ModalContext.Provider value={{ modalTypes, showModal, hideModal }}>
      {children}
      {modalTypes.map((type) => MODALS[type])}

      <ToastContainer />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
