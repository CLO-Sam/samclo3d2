export interface CreatorThumbnail {
  id: string;
  imageUrl: string;
  alt?: string;
}

export interface CreatorOccupation {
  code: number;
  name: string;
}

export interface Creator {
  id: string;
  name: string;
  profileImageUrl?: string;
  nationalCode?: string;
  nationalName?: string;
  followerCount: number;
  followingCount: number;
  viewCount?: number;
  likeCount?: number;
  occupations?: CreatorOccupation[];
  mastHead?: string;
  thumbnails?: CreatorThumbnail[];
  isFollowing?: boolean;
}

export interface FollowUser {
  id: string;
  name: string;
  profileImageUrl?: string;
  nationalCode?: string;
  nationalName?: string;
  isFollowing?: boolean;
}

export interface CreatorsApiResponse {
  data: Creator[];
  total?: number;
  hasMore?: boolean;
}

export interface FollowListApiResponse {
  data: FollowUser[];
  total?: number;
  hasMore?: boolean;
}
