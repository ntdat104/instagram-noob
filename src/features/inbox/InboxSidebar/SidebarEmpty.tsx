import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';

const SidebarEmpty = () => {
  const { showModal } = useModalContext();

  return (
    <p className={clsx('text-sm text-center mt-4 px-2', 'text-base-gray')}>
      You don&apos;t have any messages, click{' '}
      <span
        onClick={() => showModal(MODAL_TYPES.NEW_MESSAGE)}
        className={clsx('text-primary', 'cursor-pointer')}
      >
        here
      </span>{' '}
      to create your conversation
    </p>
  );
};

export default SidebarEmpty;
