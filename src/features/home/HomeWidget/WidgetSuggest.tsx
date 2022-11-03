import { useEffect } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { ROUTES } from '~/constants';
import { useGetSuggestionsLazyQuery } from '~/types/generated';
import { useAuthSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { authActions } from '~/redux/slices/authSlice';

import WidgetSuggestItem from './WidgetSuggestItem';
import IconNotFound from '~/components/Icon/IconNotFound';

const WidgetSuggest = () => {
  const { suggestedUsers } = useAuthSelector();

  const [getSuggestions, { loading: getSuggestionsLoading }] = useGetSuggestionsLazyQuery();
  const dispatch = useStoreDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getSuggestions({
        variables: {
          limit: 5,
          page: 1,
        },
      });

      const data = response.data?.getSuggestions;

      if (data?.success) dispatch(authActions.addFetchedSuggestedUsers(data.users!));
    })();
  }, [getSuggestions, dispatch]);

  let body = null;

  if (suggestedUsers.length === 0 && !getSuggestionsLoading)
    body = (
      <div className={clsx('text-center mt-5', 'text-base-gray')}>
        <IconNotFound className='w-2/5 mx-auto' />
        <h1 className={clsx('mt-5 mb-2 text-sm font-bold')}>
          We didn&apos;t find any users to follow
        </h1>
        <p>Let&apos;s invite more friends to join</p>
      </div>
    );
  else
    body = (
      <div className='space-y-4 mt-3'>
        {suggestedUsers.map((user) => (
          <WidgetSuggestItem key={user._id} user={user} />
        ))}
      </div>
    );

  return (
    <div className='text-sm-1 mt-7'>
      <div className='flex-between'>
        <span className={clsx('font-medium', 'text-base-gray')}>Suggestions For You</span>
        {suggestedUsers.length > 0 && (
          <button onClick={() => router.push(ROUTES.PEOPLE)} className='btn'>
            See All
          </button>
        )}
      </div>
      {body}
    </div>
  );
};

export default WidgetSuggest;
