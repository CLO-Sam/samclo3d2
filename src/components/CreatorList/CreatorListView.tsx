import React from 'react';
import styled from '@emotion/styled';
import { UnderlineTabs } from '@closet-design-system/core-connect';
import { CreatorCard } from '@/components/CreatorCard';
import { Creator } from '@/types/creator';
import { mq } from '@/styles/breakpoints';
import { theme } from '@/styles/theme';

const PageContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 100vh;
  background: ${theme.colors.GRAY_900};

  ${mq({
    padding: ['16px', '24px 16px'],
  })}
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.GRAY_50};
  margin: 0 0 24px;

  ${mq({
    fontSize: ['20px', '24px'],
  })}
`;

const TabsWrapper = styled.div`
  margin-bottom: 24px;
`;

const CreatorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoadingMessage = styled.div`
  padding: 48px;
  text-align: center;
  color: ${theme.colors.GRAY_400};
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  padding: 48px;
  text-align: center;
  color: ${theme.colors.TORCH_200};
  font-size: 16px;
`;

const LoadMoreTrigger = styled.div`
  width: 100%;
  height: 1px;
  visibility: hidden;
`;

interface CreatorListViewProps {
  creators: Creator[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  onFollowClick: (creatorId: string) => void;
  onFollowerCountClick: (creatorId: string) => void;
}

export const CreatorListView: React.FC<CreatorListViewProps> = ({
  creators,
  isLoading,
  error,
  hasMore,
  loadMoreRef,
  onFollowClick,
  onFollowerCountClick,
}) => {
  const tabs = [{ label: 'Recent', value: 'recent' }];

  return (
    <PageContainer>
      <PageTitle>Creators</PageTitle>
      <TabsWrapper>
        <UnderlineTabs
          tabs={tabs}
          value="recent"
          onChange={() => {}}
          tabUnderline
        />
      </TabsWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!error && (
        <>
          <CreatorList>
            {creators.map((creator, index) => (
              <CreatorCard
                key={`${creator.id}-${index}`}
                creator={creator}
                onFollowClick={onFollowClick}
                onFollowerCountClick={onFollowerCountClick}
              />
            ))}
          </CreatorList>

          {isLoading && <LoadingMessage>Loading...</LoadingMessage>}

          {hasMore && creators.length > 0 && (
            <LoadMoreTrigger ref={loadMoreRef} />
          )}
        </>
      )}
    </PageContainer>
  );
};
