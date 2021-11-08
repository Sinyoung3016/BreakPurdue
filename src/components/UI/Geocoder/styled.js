import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 100px;
  right: 12px;
  width: 240px;
  height: 40px;

  z-index: 3000;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 2rem;
  margin-bottom: 12px;

  border: none;
  outline: none;
  border-radius: 10px;
`;

export const List = styled.ul`
  padding: 5px 10px;
  margin: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Item = styled.li`
  cursor: pointer;
  font-size: 1.5rem;
`;
