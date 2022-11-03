import { useRouter } from 'next/router';

import clsx from 'clsx';

import { ROUTES } from '~/constants';

import Container from '../Container';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

// images
import { logo } from '~/assets/images';

const Header = () => {
  const router = useRouter();

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40',
        'border-b border-1 border-line',
        'bg-white',
      )}
    >
      <Container
        className={clsx(
          'grid md:grid-cols-3 items-center justify-center h-header-h py-3 px-4 lg:px-0 mt-0',
        )}
      >
        <img
          onClick={() => router.push(ROUTES.HOME)}
          className={clsx('hidden md:block h-8', 'cursor-pointer')}
          src={logo.src}
          alt='Logo'
          draggable={false}
        />
        <HeaderMiddle />
        <HeaderRight />
      </Container>
    </header>
  );
};

export default Header;
