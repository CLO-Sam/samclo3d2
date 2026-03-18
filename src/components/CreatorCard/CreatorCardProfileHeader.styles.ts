import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: ${theme.colors.GRAY_800};
  border-radius: 12px 12px 0 0;

  @media (min-width: 1200px) {
    flex-direction: row;
    border-radius: 12px 0 0 12px;
    height: 100%;
    min-height: 200px;
  }
`;

export const ProfileAvatar = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background: ${theme.colors.GRAY_700};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 24px;
    font-weight: 600;
    color: ${theme.colors.GRAY_400};
  }

  @media (min-width: 1200px) {
    width: 72px;
    height: 72px;
  }
`;

export const ProfileContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProfileHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const CreatorName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.GRAY_50};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;

  @media (min-width: 1200px) {
    font-size: 16px;
  }
`;

export const FollowButton = styled.button<{ variant: 'follow' | 'following' }>`
  flex-shrink: 0;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${theme.colors.GRAY_600};
  background: ${(props) =>
    props.variant === 'following' ? theme.colors.GRAY_700 : theme.colors.GRAY_750};
  color: ${theme.colors.GRAY_50};

  &:hover {
    background: ${(props) =>
      props.variant === 'following' ? theme.colors.GRAY_600 : theme.colors.GRAY_700};
  }
`;

export const OccupationText = styled.p`
  font-size: 12px;
  color: ${theme.colors.GRAY_400};
  margin: 0;
`;

export const LocationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${theme.colors.GRAY_400};

  svg {
    flex-shrink: 0;
    opacity: 0.8;
  }
`;

export const BioText = styled.p`
  font-size: 12px;
  color: ${theme.colors.GRAY_400};
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${theme.colors.GRAY_50};

  svg {
    flex-shrink: 0;
    opacity: 0.9;
  }
`;

export const FollowerCountButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${theme.colors.GRAY_50};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;

  svg {
    flex-shrink: 0;
    opacity: 0.9;
  }

  &:hover {
    color: ${theme.colors.BLUE_200};
  }
`;
