import clsx from 'clsx';

import IconNotFound from './Icon/IconNotFound';

interface EmptyResultProps {
  className?: string;
}

const EmptyResult = ({ className }: EmptyResultProps) => {
  return (
    <div
      className={clsx(
        'flex-center flex-col text-center w-full h-full px-10',
        'text-gray',
        className,
      )}
    >
      <IconNotFound className='w-2/6' />
      <h3 className='font-bold text-base mt-3'>We didn&apos;t find any results</h3>
      <p className={clsx('text-sm mt-1 leading-5', 'text-base-gray')}>
        Make sure everything is spelled correctly or try different keywords.
      </p>
    </div>
  );
};

export default EmptyResult;
