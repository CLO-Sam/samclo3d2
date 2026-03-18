import React from 'react';
import styled from '@emotion/styled';
import { FollowUser } from '@/types/creator';
import { theme } from '@/styles/theme';

const UserList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.GRAY_100};
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.GRAY_200};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.GRAY_900};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserMeta = styled.div`
  font-size: 12px;
  color: ${theme.colors.GRAY_500};
  margin-top: 2px;
`;

const LoadingMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: ${theme.colors.GRAY_500};
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: ${theme.colors.TORCH_500};
  font-size: 14px;
`;

const EmptyMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: ${theme.colors.GRAY_500};
  font-size: 14px;
`;

interface FollowListModalViewProps {
  users: FollowUser[];
  isLoading: boolean;
  error: string | null;
  contentRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}

export const FollowListModalView: React.FC<FollowListModalViewProps> = ({
  users,
  isLoading,
  error,
  contentRef,
  onScroll,
}) => {
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!isLoading && users.length === 0) {
    return <EmptyMessage>No users to display</EmptyMessage>;
  }

  return (
    <UserList ref={contentRef} onScroll={onScroll}>
      {users.map((user) => (
        <UserItem key={user.id}>
          <Avatar>
            {user.profileImageUrl ? (
              <img src={user.profileImageUrl} alt={user.name} />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: theme.colors.GRAY_300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.colors.GRAY_500,
                  fontSize: 16,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </Avatar>
          <UserInfo>
            <UserName>{user.name}</UserName>
            {user.nationalName && (
              <UserMeta>{user.nationalName}</UserMeta>
            )}
          </UserInfo>
        </UserItem>
      ))}
      {isLoading && (
        <LoadingMessage>Loading...</LoadingMessage>
      )}
    </UserList>
  );
};
