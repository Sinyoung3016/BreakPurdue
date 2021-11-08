import React from 'react';
import Overlay from '../Overlay';
import * as Style from './styled';

function ModalLayout({ children, closeModal }) {
  return (
    <Overlay active clickOverlay={closeModal}>
      <Style.Container>{children}</Style.Container>
    </Overlay>
  );
}

export default ModalLayout;
