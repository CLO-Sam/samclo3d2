import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '@closet-design-system/core-connect';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeFollowListModal,
  fetchFollowListRequest,
} from '@/store/slices/followListSlice';
import { RootState } from '@/store';
import { FollowListModalView } from './FollowListModalView';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const TabContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 0 16px 12px;
  border-bottom: 1px solid ${theme.colors.GRAY_200};
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) =>
    props.active ? theme.colors.GRAY_900 : theme.colors.GRAY_500};
  border-bottom: 2px solid
    ${(props) => (props.active ? theme.colors.BLUE_500 : 'transparent')};
  margin-bottom: -1px;
  padding-bottom: 8px;

  &:hover {
    color: ${theme.colors.GRAY_900};
  }
`;

export const FollowListModal: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isModalOpen,
    creatorId,
    listType: initialListType,
    users,
    isLoading,
    error,
    hasMore,
    offset,
  } = useSelector((state: RootState) => state.followList);

  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(
    initialListType ?? 'followers'
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(initialListType ?? 'followers');
  }, [initialListType]);

  useEffect(() => {
    if (isModalOpen && creatorId && activeTab) {
      dispatch(
        fetchFollowListRequest({
          creatorId,
          listType: activeTab,
          append: false,
          offset: 0,
        })
      );
    }
  }, [isModalOpen, creatorId, activeTab, dispatch]);

  const handleClose = () => {
    dispatch(closeFollowListModal());
  };

  const handleTabChange = (tab: 'followers' | 'following') => {
    setActiveTab(tab);
  };

  const handleLoadMore = () => {
    if (creatorId && activeTab && hasMore && !isLoading) {
      dispatch(
        fetchFollowListRequest({
          creatorId,
          listType: activeTab,
          append: true,
          offset,
        })
      );
    }
  };

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el || !hasMore || isLoading) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      handleLoadMore();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      closeOnEsc
      closeOnOverlayClick
      showCloseIcon
      width="400px"
      isShowDividerTop
      isShowDividerBottom
      hasContentAllSpacing={false}
      contentMaxHeight={400}
    >
      <Modal.Header>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
          Follow / Following
        </h2>
      </Modal.Header>
      <TabContainer>
        <Tab
          active={activeTab === 'followers'}
          onClick={() => handleTabChange('followers')}
          type="button"
        >
          Followers
        </Tab>
        <Tab
          active={activeTab === 'following'}
          onClick={() => handleTabChange('following')}
          type="button"
        >
          Following
        </Tab>
      </TabContainer>
      <Modal.Content>
        <FollowListModalView
          users={users}
          isLoading={isLoading}
          error={error}
          contentRef={contentRef}
          onScroll={handleScroll}
        />
      </Modal.Content>
    </Modal>
  );
};
