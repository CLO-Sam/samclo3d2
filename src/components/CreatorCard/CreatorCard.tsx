import React from 'react';
import { Creator } from '@/types/creator';
import { CreatorCardProfileHeader } from './CreatorCardProfileHeader';
import { CreatorCardCarousel } from './CreatorCardCarousel';
import {
  CardWrapper,
  ProfileSectionWrapper,
  CarouselSectionWrapper,
} from './CreatorCard.styles';

interface CreatorCardProps {
  creator: Creator;
  onFollowClick: (creatorId: string) => void;
  onFollowerCountClick: (creatorId: string) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  onFollowClick,
  onFollowerCountClick,
}) => {
  const hasThumbnails = creator.thumbnails && creator.thumbnails.length > 0;

  return (
    <CardWrapper>
      <ProfileSectionWrapper>
        <CreatorCardProfileHeader
          name={creator.name}
          profileImageUrl={creator.profileImageUrl}
          occupations={creator.occupations}
          nationalName={creator.nationalName}
          viewCount={creator.viewCount}
          likeCount={creator.likeCount}
          followerCount={creator.followerCount}
          mastHead={creator.mastHead}
          isFollowing={creator.isFollowing ?? false}
          onFollowClick={() => onFollowClick(creator.id)}
          onFollowerCountClick={() => onFollowerCountClick(creator.id)}
        />
      </ProfileSectionWrapper>
      <CarouselSectionWrapper>
        {hasThumbnails ? (
          <CreatorCardCarousel thumbnails={creator.thumbnails!} />
        ) : (
          <CreatorCardCarousel thumbnails={[]} />
        )}
      </CarouselSectionWrapper>
    </CardWrapper>
  );
};
