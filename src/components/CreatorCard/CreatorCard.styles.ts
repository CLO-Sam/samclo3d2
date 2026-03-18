import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${theme.colors.GRAY_850};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

export const ProfileSectionWrapper = styled.div`
  flex-shrink: 0;

  @media (min-width: 1200px) {
    flex: 0 0 35%;
    min-width: 0;
  }
`;

export const CarouselSectionWrapper = styled.div`
  flex: 1;
  min-width: 0;

  @media (min-width: 1200px) {
    flex: 0 0 65%;
  }
`;
