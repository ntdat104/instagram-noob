import { ChangeEvent, useRef, useState } from 'react';

// types
import { Callback } from '~/types/utils';

import { isEmptyInput } from '~/helpers/string';

type HandleDebounce = <T>(
  callback: (value: string) => Promise<T>,
  emptyInputHandler?: Callback,
) => (e: ChangeEvent<HTMLInputElement>) => void;

type UseDebounceReturn = readonly [boolean, HandleDebounce];

export const useDebounce = (timing = 300): UseDebounceReturn => {
  const [debouncing, setDebouncing] = useState<boolean>(false);

  const debounceRef = useRef<number | null>(null);

  const clearDebounce = () => {
    if (debounceRef.current != null) clearTimeout(debounceRef.current);
  };

  const handleDebounce: HandleDebounce = (callback, emptyInputHandler) => {
    return (event) => {
      if (isEmptyInput(event.target.value)) {
        if (emptyInputHandler) emptyInputHandler();

        clearDebounce();
        setDebouncing(false);

        return;
      }

      setDebouncing(true);
      clearDebounce();

      debounceRef.current = window.setTimeout(async () => {
        try {
          await callback(event.target.value);
        } finally {
          setDebouncing(false);
        }
      }, timing);
    };
  };

  return [debouncing, handleDebounce] as const;
};
