import React from 'react';
import ModalLayout from '../../Layout/ModalLayout';
import MarkerIcon from '../Icon/Marker';
import CalendarIcon from '../Icon/Calendar';
import * as Style from './styled';

function ModalRecord({ record, closeModal }) {
  return (
    <ModalLayout closeModal={closeModal}>
      <Style.Container>
        {record.images.length ? <Style.Slider /> : <Style.NoImage>No Images</Style.NoImage>}
        <Style.InfoWrapper>
          <Style.Title>{record.place}</Style.Title>
          <Style.TagWrapper>
            <Style.Tag>{record.cityTag}</Style.Tag>
            <Style.Tag>{record.placeTag}</Style.Tag>
          </Style.TagWrapper>
          <Style.Info>
            <Style.Icon>
              <MarkerIcon />
            </Style.Icon>
            <Style.InfoText>{record.address}</Style.InfoText>
          </Style.Info>
          <Style.Info>
            <Style.Icon>
              <CalendarIcon />
            </Style.Icon>
            <Style.InfoText>
              최근 방문 날짜 : {record.date} <br />
              방문 횟수 : {record.numOfVisit}
            </Style.InfoText>
          </Style.Info>
        </Style.InfoWrapper>
      </Style.Container>
    </ModalLayout>
  );
}

export default ModalRecord;
