import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useAuthSelector } from '~/redux/selectors';
import { ROUTES } from '~/constants';
import { useClickOutside } from '~/hooks';

import IconCompass from '../Icon/IconCompass';
import IconCreate from '../Icon/IconCreate';
import IconHeart from '../Icon/IconHeart';
import IconHome from '../Icon/IconHome';
import IconMessenger from '../Icon/IconMessenger';
import Skeleton from '../Skeleton';

import avatar from '~/assets/avatar.png';
import HeaderRightMenu from './HeaderRightMenu';

const HeaderRight = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const { modalTypes, showModal } = useModalContext();
  const { currentUser } = useAuthSelector();

  const router = useRouter();

  useClickOutside([menuRef, avatarRef], () => setIsShowMenu(false));

  return (
    <div className='flex items-center justify-end gap-x-5'>
      <IconHome
        onClick={() => router.push(ROUTES.HOME)}
        className={clsx('flex-shrink-0', 'cursor-pointer')}
        active={router.pathname === ROUTES.HOME}
      />
      <IconMessenger
        onClick={() => router.replace(ROUTES.INBOX, undefined, { shallow: true })}
        className={clsx('flex-shrink-0', 'cursor-pointer')}
        active={router.pathname === ROUTES.INBOX}
      />
      <IconCreate
        onClick={() => showModal(MODAL_TYPES.POST_CREATOR)}
        className={clsx('flex-shrink-0', 'cursor-pointer')}
        active={modalTypes.includes(MODAL_TYPES.POST_CREATOR)}
      />
      <IconCompass className={clsx('flex-shrink-0', 'cursor-pointer')} active={false} />
      <IconHeart className={clsx('flex-shrink-0', 'cursor-pointer')} active={false} />

      <div className={clsx('relative', 'flex-shrink-0', 'cursor-pointer')}>
        <Skeleton
          ref={avatarRef}
          objectFit='cover'
          onClick={() => setIsShowMenu(!isShowMenu)}
          rounded
          className='w-7 h-7'
          src={currentUser?.avatar ?? avatar.src}
        />
        {isShowMenu && <HeaderRightMenu ref={menuRef} />}
      </div>
    </div>
  );
};

export default HeaderRight;
