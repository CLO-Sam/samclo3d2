import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCreatorsRequest,
  toggleFollowCreator,
} from '@/store/slices/creatorSlice';
import { openFollowListModal } from '@/store/slices/followListSlice';
import { RootState } from '@/store';
import { CreatorListView } from './CreatorListView';

export const CreatorListContainer: React.FC = () => {
  const dispatch = useDispatch();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { creators, isLoading, error, hasMore, offset } = useSelector(
    (state: RootState) => state.creator
  );

  useEffect(() => {
    dispatch(fetchCreatorsRequest({ offset: 0, append: false }));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    dispatch(
      fetchCreatorsRequest({
        offset,
        append: true,
      })
    );
  }, [dispatch, isLoading, hasMore, offset]);

  useEffect(() => {
    if (
      !loadMoreRef.current ||
      !hasMore ||
      isLoading ||
      creators.length === 0
    ) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '100px', threshold: 0 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMore, hasMore, isLoading, creators.length]);

  const handleFollowClick = useCallback(
    (creatorId: string) => {
      dispatch(toggleFollowCreator(creatorId));
    },
    [dispatch]
  );

  const handleFollowerCountClick = useCallback(
    (creatorId: string) => {
      dispatch(
        openFollowListModal({
          creatorId,
          listType: 'followers',
        })
      );
    },
    [dispatch]
  );

  return (
    <CreatorListView
      creators={creators}
      isLoading={isLoading}
      error={error}
      hasMore={hasMore}
      loadMoreRef={loadMoreRef}
      onFollowClick={handleFollowClick}
      onFollowerCountClick={handleFollowerCountClick}
    />
  );
};
