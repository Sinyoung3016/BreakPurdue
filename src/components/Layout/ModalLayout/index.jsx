import React from 'react';
import ReactDOM from 'react-dom';
import * as Style from './styled';

function Overlay({ children, clickOverlay }) {
  const modalTag = document.getElementById('modal');

  return (
    modalTag &&
    ReactDOM.createPortal(
      <>
        <Style.Overlay aria-label="overlay" onClick={clickOverlay} />
        {children}
      </>,
      modalTag,
    )
  );
}

function ModalLayout({ children, closeModal }) {
  return (
    <Overlay clickOverlay={closeModal}>
      <Style.Container>{children}</Style.Container>
    </Overlay>
  );
}

export default ModalLayout;
