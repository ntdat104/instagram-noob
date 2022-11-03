import { createPortal } from 'react-dom';

import clsx from 'clsx';

import { __client__ } from '~/constants';
import { getToasts } from '~/store/toast';

import ToastItem from './ToastItem';

const ToastContainer = () => {
  const toasts = getToasts();

  if (!__client__) return null;

  return createPortal(
    <div className={clsx('fixed right-3 md:right-5 top-11 z-50', 'space-y-4')}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
