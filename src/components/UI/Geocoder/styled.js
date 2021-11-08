import styled from '@emotion/styled';

export const Container = styled.form`
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
  padding-left: 1rem;
  padding-right: 4rem;
  margin-bottom: 12px;

  border: none;
  outline: none;
  border-radius: 10px;
`;

export const IconWrapper = styled.button`
  position: absolute;
  margin: 0;
  padding: 0;
  right: 0.7rem;
  top: 1rem;
  width: 20px;
  height: 20px;

  border: none;
  background-color: white;
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
