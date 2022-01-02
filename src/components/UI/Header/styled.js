import styled from '@emotion/styled';
import { mq } from '../../../style/mediaQuery';

export const Container = styled.header`
  width: 100%;
  height: 8rem;
  padding: 0 min(3%, 55px) 0 min(2%, 33px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  ${mq('sm')} {
    height: 5rem;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-family: 'Comfortaa', cursive;
  ${mq('sm')} {
    font-size: 2.5rem;
  }
`;

export const Id = styled.h2`
  font-size: 2rem;
  ${mq('sm')} {
    font-size: 2rem;
  }
`;
