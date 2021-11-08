import styled from '@emotion/styled';

export const Overlay = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;
