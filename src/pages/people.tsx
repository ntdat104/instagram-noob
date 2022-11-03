import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';

import clsx from 'clsx';

import {
  GetSuggestionsDocument,
  GetSuggestionsQuery,
  GetSuggestionsQueryVariables,
  useGetSuggestionsLazyQuery,
} from '~/types/generated';
import { LIMITS } from '~/constants';
import { withRoute } from '~/hocs';
import { initializeApollo } from '~/lib/apolloClient';
import { useIntersectionObserver } from '~/hooks';
import { authActions } from '~/redux/slices/authSlice';
import { useAuthSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';

import { SpinnerRing } from '~/components/Spinner';
import Header from '~/components/Header';
import Meta from '~/layouts/Meta';
import PeopleItem from '~/features/people/PeopleItem';
import PeopleEmpty from '~/features/people/PeopleEmpty';
import Container from '~/components/Container';

interface PeopleProps {
  nextPage: number | null;
}

const People = ({ nextPage }: PeopleProps) => {
  const [page, setPage] = useState<number | null>(nextPage);

  const calledPagesRef = useRef<Array<number | null>>([]);

  const { suggestedUsers } = useAuthSelector();

  const [getSuggestions, { loading: getSuggestionsLoading }] = useGetSuggestionsLazyQuery();
  const { isIntersecting, containerObserverRef, observerRef } = useIntersectionObserver();
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (
      !isIntersecting ||
      page == null ||
      getSuggestionsLoading ||
      calledPagesRef.current.includes(page)
    )
      return;

    calledPagesRef.current.push(page);

    (async () => {
      const response = await getSuggestions({
        variables: {
          limit: LIMITS.SUGGESTED_PEOPLE,
          page: page,
        },
      });

      const data = response.data?.getSuggestions;

      if (!data?.success) return;

      dispatch(authActions.addFetchedSuggestedUsers(data.users!));
      setPage(data.nextPage ?? null);
    })();
  }, [isIntersecting, page, getSuggestionsLoading, getSuggestions, dispatch]);

  let body = null;

  if (suggestedUsers.length === 0) body = <PeopleEmpty />;
  else
    body = (
      <>
        <h1 className='font-medium text-base pl-4'>Suggested</h1>
        <ul className={clsx('text-sm-1 p-4 mt-2 wrapper-border space-y-4')}>
          {suggestedUsers.map((user) => (
            <PeopleItem key={user._id} user={user} />
          ))}
        </ul>
      </>
    );

  return (
    <Meta title='Instagram'>
      <Header />
      <Container ref={containerObserverRef} className='px-2 md:px-10 lg:px-32 py-10'>
        {body}
        <div ref={observerRef} />
        {getSuggestionsLoading && <SpinnerRing className='mx-auto mt-5' />}
      </Container>
    </Meta>
  );
};

export default People;

export const getServerSideProps: GetServerSideProps = withRoute({ isProtected: true })(
  async (ctx, dispatch) => {
    const client = initializeApollo({ headers: ctx.req.headers });

    const response = await client.query<GetSuggestionsQuery, GetSuggestionsQueryVariables>({
      query: GetSuggestionsDocument,
      variables: {
        limit: LIMITS.SUGGESTED_PEOPLE,
        page: 1,
      },
    });

    const data = response.data.getSuggestions;

    if (!data.success)
      return {
        props: {},
      };

    dispatch(authActions.addFetchedSuggestedUsers(data.users!));

    return {
      props: {
        nextPage: data.nextPage,
      },
    };
  },
);
