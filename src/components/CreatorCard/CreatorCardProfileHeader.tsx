import React from 'react';
import {
  ViewIcon,
  LikeIcon,
  AvatarShowIcon,
  LocationIcon,
} from '@closet-design-system/core-connect';
import {
  ProfileSection,
  ProfileAvatar,
  ProfileContent,
  ProfileHeaderRow,
  CreatorName,
  FollowButton,
  OccupationText,
  LocationRow,
  StatsRow,
  StatItem,
  FollowerCountButton,
  BioText,
} from './CreatorCardProfileHeader.styles';

interface CreatorCardProfileHeaderProps {
  name: string;
  profileImageUrl?: string;
  occupations?: { code: number; name: string }[];
  nationalName?: string;
  viewCount?: number;
  likeCount?: number;
  followerCount: number;
  mastHead?: string;
  isFollowing: boolean;
  onFollowClick: () => void;
  onFollowerCountClick: () => void;
}

export const CreatorCardProfileHeader: React.FC<
  CreatorCardProfileHeaderProps
> = ({
  name,
  profileImageUrl,
  occupations,
  nationalName,
  viewCount = 0,
  likeCount = 0,
  followerCount,
  mastHead,
  isFollowing,
  onFollowClick,
  onFollowerCountClick,
}) => {
  const occupationLabels =
    occupations?.map((o) => o.name).join(', ') || undefined;

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toLocaleString();
  };

  return (
    <ProfileSection>
      <ProfileAvatar>
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={name} />
        ) : (
          <span>{name.charAt(0).toUpperCase()}</span>
        )}
      </ProfileAvatar>
      <ProfileContent>
        <ProfileHeaderRow>
          <CreatorName>{name}</CreatorName>
          <FollowButton
            variant={isFollowing ? 'following' : 'follow'}
            onClick={onFollowClick}
            type="button"
          >
            {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
          </FollowButton>
        </ProfileHeaderRow>
        {occupationLabels && (
          <OccupationText>{occupationLabels}</OccupationText>
        )}
        {nationalName && (
          <LocationRow>
            <LocationIcon size={14} />
            <span>{nationalName}</span>
          </LocationRow>
        )}
        {mastHead && <BioText>{mastHead}</BioText>}
        <StatsRow>
          <StatItem>
            <ViewIcon size={14} />
            <span>{formatCount(viewCount)}</span>
          </StatItem>
          <StatItem>
            <LikeIcon size={14} />
            <span>{formatCount(likeCount)}</span>
          </StatItem>
          <FollowerCountButton
            onClick={onFollowerCountClick}
            type="button"
            aria-label={`${followerCount} followers`}
          >
            <AvatarShowIcon size={14} />
            <span>{formatCount(followerCount)}</span>
          </FollowerCountButton>
        </StatsRow>
      </ProfileContent>
    </ProfileSection>
  );
};
