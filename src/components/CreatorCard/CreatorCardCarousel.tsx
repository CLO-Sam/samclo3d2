import React, { useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@closet-design-system/core-connect';
import { CreatorThumbnail } from '@/types/creator';
import {
  CarouselSection,
  CarouselTrack,
  CarouselItem,
  ThumbnailImage,
  NavButton,
} from './CreatorCardCarousel.styles';

const MAX_VISIBLE_COUNT = 4;

interface CreatorCardCarouselProps {
  thumbnails: CreatorThumbnail[];
}

export const CreatorCardCarousel: React.FC<CreatorCardCarouselProps> = ({
  thumbnails,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = thumbnails?.length ?? 0;
  const maxIndex = Math.max(0, count - MAX_VISIBLE_COUNT);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  if (!count) {
    return (
      <CarouselSection>
        <CarouselItem>
          <ThumbnailImage>
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(255,255,255,0.05)',
              }}
            />
          </ThumbnailImage>
        </CarouselItem>
      </CarouselSection>
    );
  }

  return (
    <CarouselSection>
      <CarouselTrack currentIndex={currentIndex} itemCount={count}>
        {thumbnails.map((thumb) => (
          <CarouselItem key={thumb.id}>
            <ThumbnailImage>
              <img
                src={thumb.imageUrl}
                alt={thumb.alt ?? ''}
                loading="lazy"
              />
            </ThumbnailImage>
          </CarouselItem>
        ))}
      </CarouselTrack>

      {count > MAX_VISIBLE_COUNT && (
        <>
          <NavButton
            position="left"
            onClick={goPrev}
            type="button"
            aria-label="Previous"
          >
            <ChevronLeftIcon size={18} />
          </NavButton>
          <NavButton
            position="right"
            onClick={goNext}
            type="button"
            aria-label="Next"
          >
            <ChevronRightIcon size={18} />
          </NavButton>
        </>
      )}
    </CarouselSection>
  );
};
