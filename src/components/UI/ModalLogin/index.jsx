import React, { useState } from 'react';
import ModalLayout from '../../Layout/ModalLayout';
import * as Style from './styled';

function ModalLogin({ closeModal, login }) {
  const [value, setValue] = useState('');

  const clickTitle = () => {
    const isSuccess = login(value);
    if (isSuccess) closeModal();
  };

  const changeInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <ModalLayout closeModal={closeModal}>
      <Style.Container>
        <Style.Title onClick={clickTitle}>😉welcome😉</Style.Title>
        <Style.Input placeholder="ID를 입력하세요" value={value} onChange={changeInput} />
      </Style.Container>
    </ModalLayout>
  );
}

export default ModalLogin;
