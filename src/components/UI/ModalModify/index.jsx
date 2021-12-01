import React, { useState } from 'react';
import * as Style from './styled';
import { CITY, PLACE } from '../../../converter/tag';
import Close from '../Icon/Close';
import ModalLayout from '../../Layout/ModalLayout';

function Tag({ text, selected, clickTag }) {
  return (
    <Style.Tag onClick={clickTag} selected={selected}>
      {text}
    </Style.Tag>
  );
}

function ModalModify({ record, images, closeModal, submitRecord, deleteMarker }) {
  const [error, setError] = useState('');
  const [info, setInfo] = useState({
    id: record.id || '',
    address: record.address || '',
    place: record.place || '',
    date: record.date || '',
    numOfVisit: record.numOfVisit || 1,
    cityTag: record.cityTag || '',
    placeTag: record.placeTag || '',
    newImages: [],
    images: images || [],
    lng: record.lng,
    lat: record.lat,
  });

  const changePlace = (event) => {
    setInfo({ ...info, place: event.target.value });
  };

  const changeDate = (event) => {
    setInfo({ ...info, date: event.target.value });
  };

  const increaseVisitedNum = () => {
    setInfo({ ...info, numOfVisit: info.numOfVisit + 1 || 1 });
  };

  const decreaseVisitedNum = () => {
    setInfo({ ...info, numOfVisit: info.numOfVisit - 1 || 1 });
  };

  const clickCityTag = (tag) => {
    setInfo({ ...info, cityTag: tag });
  };

  const clickSpaceTag = (tag) => {
    setInfo({ ...info, placeTag: tag });
  };

  const uploadImage = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      const image = {
        file,
        preview: reader.result,
      };
      setInfo({ ...info, newImages: [...info.newImages, image] });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!info.place || !info.date || !info.cityTag || !info.placeTag) {
      setError('정보를 모두 입력하세요');
      return;
    }
    submitRecord(info);
  };

  return (
    <ModalLayout closeModal={closeModal}>
      <Style.Container>
        <Style.CloseIconWrapper onClick={closeModal}>
          <Close />
        </Style.CloseIconWrapper>
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
            <Style.VistedNum>{info.numOfVisit}</Style.VistedNum>
            <Style.NumberButton onClick={increaseVisitedNum}>+</Style.NumberButton>
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>도시 태그</Style.InfoTitle>
            <Style.TagWrapper>
              {CITY.map((city) => (
                <Tag key={city} text={city} clickTag={() => clickCityTag(city)} selected={city === info.cityTag} />
              ))}
            </Style.TagWrapper>
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>장소 태그</Style.InfoTitle>
            <Style.TagWrapper>
              {PLACE.map((space) => (
                <Tag
                  key={space}
                  text={space}
                  clickTag={() => clickSpaceTag(space)}
                  selected={space === info.placeTag}
                />
              ))}
            </Style.TagWrapper>
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.InfoTitle>사진 ({info.images.length + info.newImages.length})</Style.InfoTitle>
            <Style.Label htmlFor="image-file">이미지 추가하기</Style.Label>
            <Style.ImageInput id="image-file" type="file" onChange={uploadImage} />
          </Style.InfoItem>
          <Style.InfoItem>
            <Style.DummyTitle />
            <Style.ImageList>
              {info.images.map((image) => (
                <Style.ImageWrapper key={image}>
                  <Style.Image src={image} />
                </Style.ImageWrapper>
              ))}
              {info.newImages.map((image) => (
                <Style.ImageWrapper key={image.preview}>
                  <Style.Image src={image.preview} />
                </Style.ImageWrapper>
              ))}
            </Style.ImageList>
          </Style.InfoItem>
        </Style.InfoList>
        {error && <Style.Error>{error}</Style.Error>}
        <Style.SubmitButton onClick={handleSubmit}>☁️✈️☁️</Style.SubmitButton>
        {record.id && (
          <Style.DiscardButton onClick={() => deleteMarker(record.id)}>우리의 추억 버리기</Style.DiscardButton>
        )}
      </Style.Container>
    </ModalLayout>
  );
}

export default ModalModify;
