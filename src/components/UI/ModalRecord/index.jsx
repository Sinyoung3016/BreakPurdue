import React from 'react';
import ModalLayout from '../../Layout/ModalLayout';
import MarkerIcon from '../Icon/Marker';
import CalendarIcon from '../Icon/Calendar';
import PencilIcon from '../Icon/Pencil';
import { getComment } from '../../../dataProvider/index';
import * as Style from './styled';

function ModalRecord({ record, closeModal, clickModifyButton }) {
  return (
    <>
      <ModalLayout closeModal={closeModal}>
        <Style.Container>
          {record.images && record.images.length ? <Style.Slider /> : <Style.NoImage>No Images</Style.NoImage>}
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
      <Style.ModifyButton onClick={() => clickModifyButton(record)}>
        <Style.IconWrapper>
          <PencilIcon />
        </Style.IconWrapper>
      </Style.ModifyButton>
    </>
  );
}

export default ModalRecord;
