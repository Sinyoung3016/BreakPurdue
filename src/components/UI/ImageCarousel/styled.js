import styled from '@emotion/styled';

export const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

export const NextArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 30px;
  height: 30px !important;
  z-index: 3000;
  cursor: pointer;
`;

export const PrevArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 30px;
  height: 30px !important;
  z-index: 3000;
  cursor: pointer;
`;
