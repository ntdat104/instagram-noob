import { AppProps } from 'next/app';
import Router from 'next/router';

import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import ProgressBar from '@badrap/bar-of-progress';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { useApollo } from '~/lib/apolloClient';
import { wrapper } from '~/redux/store';

import ModalProvider from '~/contexts/ModalContext';
import SocketProvider from '~/contexts/SocketContext';

// styles
import '../styles/index.scss';

config.autoAddCss = false;

const progressBar = new ProgressBar({
  size: 4,
  className: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400',
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <SocketProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </SocketProvider>
    </ApolloProvider>
  );
}

export default wrapper.withRedux(MyApp);
