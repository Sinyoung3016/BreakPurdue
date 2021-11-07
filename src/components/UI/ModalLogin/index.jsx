import React from 'react';
import ModalLayout from '../../Layout/ModalLayout';
import * as Style from './styled';

function ModalLogin({ closeModal }) {
  return (
    <ModalLayout closeModal={closeModal}>
      <Style.Container>
        <Style.Title>😉welcome😉</Style.Title>
        <Style.Input placeholder="ID를 입력하세요" />
      </Style.Container>
    </ModalLayout>
  );
}

export default ModalLogin;
