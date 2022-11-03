import clsx from 'clsx';

import IconNotFound from '~/components/Icon/IconNotFound';

const PeopleEmpty = () => {
  return (
    <div className={clsx('text-center', 'text-base-gray')}>
      <IconNotFound className='w-40 mx-auto' />
      <h1 className={clsx('mt-5 mb-2 text-2xl font-bold')}>
        We didn&apos;t find any users to follow
      </h1>
      <p>Let&apos;s invite more friends to join</p>
    </div>
  );
};

export default PeopleEmpty;
