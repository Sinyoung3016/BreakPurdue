import React, { useState } from 'react';
import * as Style from './styled';
import ModalLayout from '../../Layout/ModalLayout';
import { cities, spaces } from '../../../common/data';

function Tag({ text, selected, clickTag }) {
  return (
    <Style.Tag onClick={clickTag} selected={selected}>
      {text}
    </Style.Tag>
  );
}

function ModalModify({ address }) {
  const [info, setInfo] = useState({
    place: '',
    address: '160 Tapawingo Dr, West Lafayette, IN 47906 미국',
    date: '',
    visitedNum: 1,
    cityTag: '',
    spaceTag: '',
    images: [],
  });

  const changePlace = (event) => {
    setInfo({ ...info, place: event.target.value });
  };

  const changeDate = (event) => {
    setInfo({ ...info, date: event.target.value });
  };

  const increaseVisitedNum = () => {
    setInfo({ ...info, visitedNum: info.visitedNum + 1 || 1 });
  };

  const decreaseVisitedNum = () => {
    setInfo({ ...info, visitedNum: info.visitedNum - 1 || 1 });
  };

  const clickCityTag = (tag) => {
    setInfo({ ...info, cityTag: tag });
  };

  const clickSpaceTag = (tag) => {
    setInfo({ ...info, spaceTag: tag });
  };

  const uploadImage = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      const image = {
        file,
        preview: reader.result,
      };
      setInfo({ ...info, images: [...info.images, image] });
    };
    reader.readAsDataURL(file);
  };

  return (
    <ModalLayout>
      <Style.Container>
        <Style.InfoList>
          <Style.InfoItem>
            <Style.InfoTitle>장소</Style.InfoTitle>
            <Style.Input value={info.place} placeholder="방문한 곳" onChange={changePlace} />
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>위치</Style.InfoTitle>
            <Style.InfoDescription>{info.address}</Style.InfoDescription>
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>날짜</Style.InfoTitle>
            <Style.Input type="date" value={info.date} onChange={changeDate} />
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>방문 횟수</Style.InfoTitle>
            <Style.NumberButton onClick={decreaseVisitedNum}>-</Style.NumberButton>
            <Style.VistedNum>{info.visitedNum}</Style.VistedNum>
            <Style.NumberButton onClick={increaseVisitedNum}>+</Style.NumberButton>
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>도시 태그</Style.InfoTitle>
            {cities.map((city) => (
              <Tag key={city} text={city} clickTag={() => clickCityTag(city)} selected={city === info.cityTag} />
            ))}
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>장소 태그</Style.InfoTitle>
            {spaces.map((space) => (
              <Tag key={space} text={space} clickTag={() => clickSpaceTag(space)} selected={space === info.spaceTag} />
            ))}
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>사진 ({info.images.length})</Style.InfoTitle>
            <Style.Label htmlFor="image-file">이미지 추가하기</Style.Label>
            <Style.ImageInput id="image-file" type="file" onChange={uploadImage} />
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle />
            <Style.ImageList>
              {info.images.map((image) => (
                <Style.ImageWrapper key={image.preview}>
                  <Style.Image src={image.preview} />
                </Style.ImageWrapper>
              ))}
            </Style.ImageList>
          </Style.InfoItem>
        </Style.InfoList>
        <Style.SubmitButton>☁️✈️☁️</Style.SubmitButton>
        <Style.DiscardButton>우리의 추억 버리기</Style.DiscardButton>
      </Style.Container>
    </ModalLayout>
  );
}

export default ModalModify;
