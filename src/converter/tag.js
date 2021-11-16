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

export const placeTag2ImgSrc = (tag) => {
  switch (tag) {
    case '음식점':
      return 'url(/images/restaurants.png)';
    case '술집':
      return 'url(/images/bars.png)';
    case '카페':
      return 'url(/images/cafe.png)';
    case '명소':
      return 'url(/images/places.png)';
    case '놀이':
      return 'url(/images/photography.png)';
    case '편의':
      return 'url(/images/commercial.png)';
    case '기타':
      return 'url(/images/tours.png)';
    default:
      return '';
  }
};

export const placeNum2ImgSrc = (num) => {
  const tag = placeNum2Tag(num);
  switch (tag) {
    case '음식점':
      return 'url(/images/restaurants.png)';
    case '술집':
      return 'url(/images/bars.png)';
    case '카페':
      return 'url(/images/cafe.png)';
    case '명소':
      return 'url(/images/places.png)';
    case '놀이':
      return 'url(/images/photography.png)';
    case '편의':
      return 'url(/images/commercial.png)';
    case '기타':
      return 'url(/images/tours.png)';
    default:
      return '';
  }
};
