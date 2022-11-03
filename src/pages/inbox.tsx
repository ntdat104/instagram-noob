import { useState } from 'react';

import clsx from 'clsx';

import { withRoute } from '~/hocs';

import Header from '../components/Header';
import InboxSidebar from '~/features/inbox/InboxSidebar';
import InboxMessage from '~/features/inbox/InboxMessage';
import Container from '~/components/Container';
import Meta from '~/layouts/Meta';

const Inbox = () => {
  const [isShowMessages, setIsShowMessages] = useState<boolean>(false);

  return (
    <Meta title='Inbox'>
      <Header />
      <Container className='inbox-height py-4'>
        <section className={clsx('flex border max-w-full h-full border-line', 'bg-white')}>
          <aside
            className={clsx(
              'w-full md:w-2/6 lg:w-2/5 flex flex-col border-r h-full border-line',
              isShowMessages ? 'hidden md:flex' : 'flex',
            )}
          >
            <InboxSidebar onShowMessages={() => setIsShowMessages(true)} />
          </aside>

          <div
            className={clsx(
              'flex flex-col w-full md:w-4/6 lg:w-3/5',
              isShowMessages ? 'flex' : 'hidden md:flex',
            )}
          >
            <InboxMessage onHideMessages={() => setIsShowMessages(false)} />
          </div>
        </section>
      </Container>
    </Meta>
  );
};

export default Inbox;

export const getServerSideProps = withRoute({ isProtected: true })();
