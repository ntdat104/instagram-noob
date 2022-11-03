import clsx from 'clsx';

const MessageContentLoading = () => {
  return (
    <div className='w-full space-y-2'>
      <div
        className={clsx('w-2/6 h-5 rounded-sm', 'bg-[length:200%] bg-skeleton', 'animate-skeleton')}
      />
      <div
        className={clsx(
          'w-2/5 h-5 rounded-sm ml-auto',
          'bg-[length:200%] bg-skeleton',
          'animate-skeleton',
        )}
      />
      <div
        className={clsx(
          'w-3/5 h-5 rounded-sm ml-auto',
          'bg-[length:200%] bg-skeleton',
          'animate-skeleton',
        )}
      />
      <div
        className={clsx(
          'w-1/5 h-5 rounded-sm ml-auto',
          'bg-[length:200%] bg-skeleton',
          'animate-skeleton',
        )}
      />
    </div>
  );
};

export default MessageContentLoading;
