import React from 'react';
import ReactDOM from 'react-dom';
import * as Style from './styled';

function Overlay({ children, clickOverlay, active }) {
  const modalTag = document.getElementById('modal');

  return (
    modalTag &&
    ReactDOM.createPortal(
      <>
        <Style.Overlay aria-label="overlay" onClick={clickOverlay} active={active} />
        {children}
      </>,
      modalTag,
    )
  );
}

export default Overlay;
