import restaurantsImg from '../../public/images/restaurants.png';
import barImg from '../../public/images/bars.png';
import cafeImg from '../../public/images/cafe.png';
import placesImg from '../../public/images/places.png';
import photographyImg from '../../public/images/photography.png';
import commercialImg from '../../public/images/commercial.png';
import toursImg from '../../public/images/tours.png';

export const CITY = ['라피엣', '시카고', '뉴욕', '인디애나폴리스'];
export const PLACE = ['음식점', '술집', '카페', '명소', '놀이', '편의', '기타'];

export const cityNum2Tag = (num) => {
  return CITY[num];
};

export const cityTag2Num = (tag) => {
  return CITY.findIndex((city) => city === tag);
};

export const placeNum2Tag = (num) => {
  return PLACE[num];
};

export const placeTag2Num = (tag) => {
  return PLACE.findIndex((place) => place === tag);
};

export const placeTag2TagSrc = (tag) => {
  switch (tag) {
    case '음식점':
      return `url(${restaurantsImg})`;
    case '술집':
      return `url(${barImg})`;
    case '카페':
      return `url(${cafeImg})`;
    case '명소':
      return `url(${placesImg})`;
    case '놀이':
      return `url(${photographyImg})`;
    case '편의':
      return `url(${commercialImg})`;
    case '기타':
      return `url(${toursImg})`;
    default:
      return '';
  }
};

export const placeNum2TagSrc = (num) => {
  const tag = placeNum2Tag(num);
  switch (tag) {
    case '음식점':
      return `url(${restaurantsImg})`;
    case '술집':
      return `url(${barImg})`;
    case '카페':
      return `url(${cafeImg})`;
    case '명소':
      return `url(${placesImg})`;
    case '놀이':
      return `url(${photographyImg})`;
    case '편의':
      return `url(${commercialImg})`;
    case '기타':
      return `url(${toursImg})`;
    default:
      return '';
  }
};
