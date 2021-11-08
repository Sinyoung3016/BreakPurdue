import React, { useState } from 'react';
import ModalLogin from '../ModalLogin';
import * as Style from './styled';

function Header({ user, login }) {
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => {
    if (user) return;
    setModalOpened(!modalOpened);
  };

  return (
    <Style.Container>
      {modalOpened && <ModalLogin closeModal={toggleModal} login={login} />}
      <Style.Title>🦁BreakPurdue</Style.Title>
      <Style.Id onClick={toggleModal}>{user || 'Login'}</Style.Id>
    </Style.Container>
  );
}

export default Header;
