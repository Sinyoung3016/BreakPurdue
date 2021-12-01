import styled from '@emotion/styled';
import { mq } from '../../../style/mediaQuery';

export const Container = styled.div`
  position: relative;
  width: 1500px;
  height: 720px;
  padding: 57px 0 0 57px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${mq('mobile')} {
    width: 100vw;
    height: 100vh;
    display: block;
    padding: 6rem 2rem 10rem 2rem;
    border-radius: 0;
    overflow: auto;
  }
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export const InfoList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const InfoItem = styled.li`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${mq('mobile')} {
    align-items: flex-start;
  }
`;

export const InfoTitle = styled.h3`
  width: 120px;
  margin: 0;
  margin-right: 30px;
  font-size: 2.5rem;
  user-select: none;

  ${mq('mobile')} {
    width: 19%;
    word-break: keep-all;
    font-size: 1.8rem;
    margin-right: 15px;
  }
`;

export const DummyTitle = styled.h3`
  width: 120px;
  margin: 0;
  margin-right: 30px;
  font-size: 2.5rem;
  user-select: none;

  ${mq('mobile')} {
    display: none;
  }
`;

export const InfoDescription = styled.span`
  font-size: 1.8rem;
  color: #555;
  ${mq('mobile')} {
    width: 80%;
  }
`;

export const Input = styled.input`
  width: 350px;
  height: 37px;
  padding-left: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  ${mq('mobile')} {
    width: 80%;
  }
`;

export const NumberButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 20px;
  font-size: 2.5rem;
  background-color: #f0f0f0;
  user-select: none;

  &:hover {
    background-color: #d0d0d0d0;
  }
`;

export const VistedNum = styled.div`
  width: 40px;
  height: 37px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  user-select: none;
`;

export const ImageList = styled.ul`
  display: flex;
  overflow-x: auto;
  padding: 0;
`;

export const ImageWrapper = styled.li`
  width: 180px;
  height: 150px;
  margin-right: 1rem;
  background-color: #555;
`;

export const Image = styled.img`
  display: block;
  width: 180px;
  height: 150px;
  object-fit: scale-down;
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  ${mq('mobile')} {
    width: 80%;
  }
`;

export const Tag = styled.div`
  padding: 3px 10px;
  margin-right: 1rem;
  font-size: 1.5rem;
  border-radius: 15px;
  color: ${(props) => (props.selected ? '#312070' : '#909090')};
  background-color: ${(props) => (props.selected ? '#d8d2e7' : '#f0f0f0')};
  cursor: pointer;
  user-select: none;

  ${mq('mobile')} {
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;

  color: #312070;
  outline: none;
  cursor: pointer;
  font-size: 1.8rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  user-select: none;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const Error = styled.span`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: red;
  user-select: none;
`;

export const SubmitButton = styled.button`
  position: absolute;
  bottom: 2.7rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4rem;
  border: none;
  background-color: transparent;
  user-select: none;

  ${mq('mobile')} {
    bottom: 4rem;
  }
`;

export const DiscardButton = styled.button`
  position: absolute;
  bottom: 1.4rem;
  right: 2.9rem;

  color: #d95999;
  font-size: 1.5rem;
  border: none;
  background-color: transparent;
  user-select: none;

  ${mq('mobile')} {
    right: 50%;
    transform: translateX(50%);
  }
`;
