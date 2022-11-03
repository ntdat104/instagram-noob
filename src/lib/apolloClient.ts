import { useMemo } from 'react';

import { ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { IncomingHttpHeaders } from 'http';
import fetch from 'isomorphic-unfetch';
import isEqual from 'lodash/isEqual';
import merge from 'deepmerge';

import { toast } from '~/store/toast';
import { DOMAIN, __prod__ } from '~/constants';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

interface ApolloStateProps {
  [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
}

interface InitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: NormalizedCacheObject | null;
}

type ApolloCache = ApolloClient<NormalizedCacheObject>;

let apolloClient: ApolloCache;

const errorLink = onError((errors) => {
  if (errors) {
    toast({ messageType: 'serverError', status: 'error' });
    console.log('Error link =>', errors);
  }
});

const createApolloClient = (headers: IncomingHttpHeaders | null = null): ApolloCache => {
  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        // Here we pass the cookie along for each request
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response);
  };

  const httpLink = new HttpLink({
    uri: DOMAIN + '/api/graphql',
    fetchOptions: {
      mode: 'cors',
    },
    credentials: 'include',
    fetch: enhancedFetch,
  });

  return new ApolloClient({
    // SSR only for Node.js
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
};

export const initializeApollo = (
  { headers, initialState }: InitializeApollo = {
    headers: null,
    initialState: null,
  },
): ApolloCache => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // Combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloCache,
  pageProps: { props: ApolloStateProps },
): {
  props: ApolloStateProps;
} => {
  if (pageProps?.props) pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

export const useApollo = (pageProps: ApolloStateProps): ApolloCache => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo({ initialState: state }), [state]);

  return store;
};
