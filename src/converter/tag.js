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
