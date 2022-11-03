import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';

import IconDirect from '~/components/Icon/IconDirect';

const MessagePlaceholder = () => {
  const { showModal } = useModalContext();

  return (
    <div className='flex-center flex-col w-full h-full'>
      <IconDirect />
      <p className='mt-4 text-sm'>Send private photos and messages to a friend or group.</p>
      <button
        onClick={() => showModal(MODAL_TYPES.NEW_MESSAGE)}
        className={clsx('btn mt-4 text-sm px-4 py-2', 'text-white bg-primary')}
      >
        Send Message
      </button>
    </div>
  );
};

export default MessagePlaceholder;
