import { ReactNode } from 'react';
import Head from 'next/head';

interface MetaProps {
  title: string;
  children: ReactNode;
}

function Meta({ title, children }: MetaProps) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Instagram Clone - Best social network in github not world 😄'
        />
        <title>{title}</title>
      </Head>

      {children}
    </>
  );
}

export default Meta;
