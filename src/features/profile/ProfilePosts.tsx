import { useEffect } from 'react';

import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { LIMITS } from '~/constants';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useIntersectionObserver } from '~/hooks';
import { usePostSelector } from '~/redux/selectors';
import { postActions } from '~/redux/slices/postSlice';
import { useStoreDispatch } from '~/redux/store';
import { useGetPostsLazyQuery } from '~/types/generated';

import IconHeart from '~/components/Icon/IconHeart';
import IconPhotoVideo from '~/components/Icon/IconPhotoVideo';
import Skeleton from '~/components/Skeleton';

import photo from '~/assets/photo.png';

interface ProfilePostsProps {
  userId: string;
}

const ProfilePosts = ({ userId }: ProfilePostsProps) => {
  const { showModal } = useModalContext();
  const { posts, cursor } = usePostSelector();

  const { isIntersecting, observerRef } = useIntersectionObserver({
    rootMargin: '300px',
  });
  const [getPosts] = useGetPostsLazyQuery();
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const fetchNewPosts = async () => {
      const response = await getPosts({
        variables: {
          limit: LIMITS.POSTS,
          cursor,
          query: {
            field: 'user',
            value: userId,
          },
        },
      });

      const data = response.data?.getPosts;

      if (!data?.success) return;

      dispatch(
        postActions.addFetchedPosts({
          cursor: data.cursor ?? null,
          posts: data.posts!,
        }),
      );
    };

    if (isIntersecting && cursor != null) fetchNewPosts();
  }, [userId, cursor, isIntersecting, dispatch, getPosts]);

  if (posts.length === 0)
    return (
      <div className={clsx('text-center mt-24')}>
        <IconPhotoVideo className={clsx('mx-auto', 'text-base-gray')} />
        <p className={clsx('text-2xl mt-3', 'text-base-gray')}>No Posts Yet</p>
      </div>
    );

  return (
    <div className='grid grid-cols-3 gap-2 md:gap-3 lg:gap-7 mt-10'>
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => {
            dispatch(postActions.setSelectedPost(post));
            showModal(MODAL_TYPES.POST_DETAIL);
          }}
          className={clsx('relative', 'btn group h-36 md:h-64 lg:h-[293px]')}
        >
          <Skeleton objectFit='cover' src={post.photo ?? photo.src} alt='Post' />
          <button
            className={clsx(
              'absolute inset-0',
              'hidden group-hover:flex-center gap-x-8',
              'text-white bg-[rgba(0,0,0,0.3)]',
              'cursor-pointer',
            )}
          >
            <div className='flex items-center'>
              <IconHeart white className='w-5 mr-2' />
              <span className={clsx('font-medium text-sm')}>{post.reactions.length}</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faComment} className='w-5 mr-2' />
              <span className={clsx('font-medium text-sm')}>{post.commentCounts}</span>
            </div>
          </button>
        </div>
      ))}
      <div ref={observerRef} />
    </div>
  );
};

export default ProfilePosts;
