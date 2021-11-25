import React from 'react';
import Slider from 'react-slick';
import LeftChevron from '../Icon/LeftChevron';
import RightChevron from '../Icon/RightChevron';
import * as Style from './styled';

function NextArrow({ onClick }) {
  return (
    <Style.NextArrow onClick={onClick}>
      <RightChevron />
    </Style.NextArrow>
  );
}

function PrevArrow({ onClick }) {
  return (
    <Style.PrevArrow onClick={onClick}>
      <LeftChevron />
    </Style.PrevArrow>
  );
}

function ImageSlider({ images }) {
  const settings = {
    arrow: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <Style.ImgWrapper key={image} id="dfdf">
          <Style.Image src={image} />
        </Style.ImgWrapper>
      ))}
    </Slider>
  );
}

export default ImageSlider;
