import styled from '@emotion/styled';

interface SquareImageProps {
  imageUrl: string;
  width: number;
  shouldDarken?: boolean;
}

export const SquareImage = styled.div<SquareImageProps>`
  background-image: url(${(props): string => props.imageUrl});
  background-position: center;
  background-size: cover;
  filter: ${(props): string => (props.shouldDarken ? 'brightness(0.7)' : 'initial')};
  height: ${(props): number => props.width}px;
  margin: auto;
  width: ${(props): number => props.width}px;
`;

SquareImage.displayName = 'SquareImage';
