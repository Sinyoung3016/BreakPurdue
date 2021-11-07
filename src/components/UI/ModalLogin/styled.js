import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 34rem;
  height: 13rem;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-family: 'Comfortaa', cursive;
  cursor: pointer;
  user-select: none;
`;

export const Input = styled.input`
  width: 27rem;
  height: 3.7rem;
  padding-left: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
