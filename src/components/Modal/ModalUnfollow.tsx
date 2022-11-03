import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useAuthSelector } from '~/redux/selectors';
import { useFollowUser } from '~/hooks';

import ModalWrapper from './ModalWrapper';
import Skeleton from '../Skeleton';

import avatar from '~/assets/avatar.png';

const ModalUnfollow = () => {
  const { hideModal } = useModalContext();
  const { selectedUser } = useAuthSelector();

  const { followUserLoading, followUser } = useFollowUser(selectedUser!);

  const onHideModal = () => hideModal(MODAL_TYPES.UNFOLLOW);

  return (
    <ModalWrapper
      canClose={!followUserLoading}
      modalType={MODAL_TYPES.UNFOLLOW}
      className={clsx(
        'w-full md:w-100 text-center text-sm shadow-lg pt-8 overflow-y-auto scrollbar-none',
        'bg-white',
      )}
    >
      <Skeleton
        objectFit='cover'
        className='w-[90px] h-[90px] mx-auto'
        src={selectedUser!.avatar ?? avatar.src}
        rounded
      />
      <p className='mt-5'>Unfollow @{selectedUser!.username}?</p>
      <ul className='mt-8'>
        <li
          onClick={() => followUser('unfollow', onHideModal)}
          className={clsx(
            'font-bold py-4 text-center border-t border-line',
            'transition ease-out',
            'cursor-pointer select-none',
            followUserLoading ? 'text-base-red/40' : 'text-base-red',
          )}
        >
          Unfollow
        </li>
        <li
          onClick={onHideModal}
          className={clsx('py-4 text-center border-t border-line', 'cursor-pointer select-none')}
        >
          Cancel
        </li>
      </ul>
    </ModalWrapper>
  );
};

export default ModalUnfollow;
