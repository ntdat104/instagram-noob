import clsx from 'clsx';

const SidebarLoading = () => {
  const skeletonClass = clsx('bg-[length:200%] bg-skeleton', 'animate-skeleton');

  return (
    <div className='flex items-center px-4 py-2.5'>
      <div className={clsx('flex-shrink-0 mr-3 w-12 h-12 rounded-full', skeletonClass)} />
      <div className='w-full space-y-2'>
        <div className={clsx('w-4/5 h-3.5 rounded-sm', skeletonClass)} />
        <div className={clsx('w-3/5 h-3.5 rounded-sm', skeletonClass)} />
      </div>
    </div>
  );
};

export default SidebarLoading;
