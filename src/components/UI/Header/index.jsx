import React, { useState } from 'react';
import ModalLogin from '../ModalLogin';
import * as Style from './styled';

function Header() {
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => {
    setModalOpened(!modalOpened);
  };

  return (
    <Style.Container>
      {modalOpened && <ModalLogin closeModal={toggleModal} />}
      <Style.Title>🦁BreakPurdue</Style.Title>
      <Style.Id onClick={toggleModal}>Login</Style.Id>
    </Style.Container>
  );
}

export default Header;
