import { useEffect } from 'react';

import { LIMITS } from '~/constants';
import { useStoreDispatch } from '~/redux/store';
import { usePostSelector } from '~/redux/selectors';
import { useGetPostsLazyQuery } from '~/types/generated';
import { useIntersectionObserver } from '~/hooks';
import { postActions } from '~/redux/slices/postSlice';

import Post from '~/components/Post';

const HomeFeed = () => {
  const { posts, cursor } = usePostSelector();

  const [getPosts] = useGetPostsLazyQuery();
  const { observerRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '500px',
  });
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const fetchNewPosts = async () => {
      const response = await getPosts({
        variables: {
          limit: LIMITS.POSTS,
          cursor,
        },
      });

      const data = response.data?.getPosts;

      if (data?.success && data.posts)
        dispatch(
          postActions.addFetchedPosts({
            cursor: data.cursor ?? null,
            posts: data.posts,
          }),
        );
    };

    if (isIntersecting && cursor) fetchNewPosts();
  }, [cursor, isIntersecting, getPosts, dispatch]);

  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
      <div ref={observerRef} />
    </>
  );
};

export default HomeFeed;
