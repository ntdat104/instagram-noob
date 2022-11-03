import { memo, useCallback, useEffect, useState } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

// types
import { Toast } from '~/types/toast';

import { deleteToast } from '~/store/toast';
import { getToastTheme } from '~/helpers/toast';

const ToastItem = ({ id: toastId, content, status }: Toast) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleDeleteToast = useCallback(() => deleteToast(toastId), [toastId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleDeleteToast();
      setIsShow(false);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [handleDeleteToast]);

  const { title, background, iconColor, icon } = getToastTheme(status);

  if (!isShow) return null;

  return (
    <div
      className={clsx(
        'relative',
        'flex p-3 rounded-lg h-24 w-72 md:w-80',
        'transition-all',
        'select-none',
        background,
        isShow ? 'animate-toast-in' : 'animate-toast-out',
      )}
    >
      <div className={clsx('flex-center flex-shrink-0 mr-3 mt-3 rounded-full w-7 h-7', 'bg-white')}>
        <FontAwesomeIcon icon={icon} className={iconColor} />
      </div>
      <div className={clsx('pt-1', 'text-white')}>
        <h4 className={clsx('font-bold text-sm md:text-base')}>{title}</h4>
        <p className='text-sm-1 md:text-sm leading-normal'>{content}</p>
      </div>
      <button onClick={handleDeleteToast} className='btn h-max p-1 ml-auto'>
        <FontAwesomeIcon className={clsx('text-white')} icon={faXmark} />
      </button>
    </div>
  );
};

export default memo(ToastItem);
