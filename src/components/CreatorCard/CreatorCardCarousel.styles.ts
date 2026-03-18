import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const MAX_VISIBLE_COUNT = 4;

export const CarouselSection = styled.div`
  position: relative;
  overflow: hidden;
  background: ${theme.colors.GRAY_850};
  border-radius: 0 0 12px 12px;
  aspect-ratio: ${MAX_VISIBLE_COUNT} / 1;

  @media (min-width: 1200px) {
    border-radius: 0 12px 12px 0;
  }
`;

export const CarouselTrack = styled.div<{
  currentIndex: number;
  itemCount: number;
}>`
  display: flex;
  height: 100%;
  transform: translateX(
    calc(-1 * ${(p) => p.currentIndex} * (100% / ${(p) => p.itemCount || 1}))
  );
  transition: transform 0.3s ease;
`;

export const CarouselItem = styled.div`
  flex: 0 0 calc(100% / ${MAX_VISIBLE_COUNT});
  width: calc(100% / ${MAX_VISIBLE_COUNT});
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

export const ThumbnailImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: ${theme.colors.GRAY_700};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const NavButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(p) => (p.position === 'left' ? 'left: 4px' : 'right: 4px')};
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: ${theme.colors.GRAY_50};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
