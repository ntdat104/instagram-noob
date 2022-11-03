import { Dispatch, SetStateAction, useState } from 'react';

import { nanoid } from 'nanoid';

// types
import { Toast } from '~/types/toast';

import { toastMessages } from '~/helpers/toast';

type AddToast = (param: {
  status: Toast['status'];
  messageType?: keyof typeof toastMessages;
  content?: string;
}) => void;

type CreateToastStore = () => {
  getToasts: () => Toast[];
  toast: AddToast;
  deleteToast: (toastId: string) => void;
};

const createToastStore: CreateToastStore = () => {
  let setToastsState: Dispatch<SetStateAction<Toast[]>> = () => {};

  const addToast: AddToast = ({ content, messageType, status }) => {
    setToastsState((prevToasts) => [
      ...prevToasts,
      { id: nanoid(16), content: content ?? toastMessages[messageType!], status },
    ]);
  };

  const deleteToast = (toastId: string) =>
    setToastsState((prevToast) => prevToast.filter((toast) => toast.id !== toastId));

  const useGetToasts = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    setToastsState = setToasts;

    return toasts;
  };

  return { getToasts: useGetToasts, toast: addToast, deleteToast };
};

export const { toast, getToasts, deleteToast } = createToastStore();
