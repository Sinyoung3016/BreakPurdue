import styled from '@emotion/styled';
import { mq } from '../../../style/mediaQuery';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 900px;
  height: 500px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${mq('sm')} {
    width: 100vw;
    height: 100vh;
    display: block;
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

export const Slider = styled.div`
  width: calc(100% - 315px);
  height: 100%;

  div {
    height: 100%;
    outline: none;
  }

  ${mq('sm')} {
    padding-top: 75px;
    width: 100%;
    height: 400px;
  }
`;

export const NoImage = styled.div`
  width: calc(100% - 315px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;

  ${mq('sm')} {
    padding-top: 75px;
    width: 100%;
    height: 400px;
  }
`;

export const InfoWrapper = styled.div`
  width: 315px;
  padding: 4rem 2rem 0 2rem;

  ${mq('sm')} {
    width: auto;
    padding-top: 0;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;

  ${mq('sm')} {
    position: absolute;
    top: 10px;
  }
`;

export const TagWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  ${mq('sm')} {
    position: absolute;
    top: 35px;
  }
`;

export const Tag = styled.div`
  padding: 3px 10px;
  margin-right: 1rem;
  font-size: 1.5rem;
  border-radius: 15px;
  color: #909090;
  background-color: #f0f0f0;
  user-select: none;
`;

export const Info = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const Icon = styled.div`
  margin-right: 13px;
  width: 20px;
  height: 20px;
`;

export const InfoText = styled.span`
  width: 22rem;
  margin: 0;
  color: #555;
  font-size: 1.5rem;

  ${mq('sm')} {
    width: 80%;
  }
`;

export const CommentTitle = styled.h3`
  margin-bottom: 0.2rem;
  font-size: 1.5rem;
  font-family: 'Comfortaa', cursive;
`;

export const CommentList = styled.ul`
  margin: 0;
  padding: 0;
  padding-bottom: 1.5rem;
  height: 250px;
  overflow: auto;
  user-select: none;
`;

export const CommentItem = styled.li`
  border-bottom: 1px solid #c0c0c0;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  &:last-child {
    border: none;
  }
`;

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${mq('sm')} {
    flex-direction: column-reverse;
  }
`;

export const CommentHeader = styled.header`
  display: flex;
  font-size: 1.2rem;
`;

export const CommentAuthor = styled.span``;

export const DeleteIcon = styled.div`
  margin-left: 3px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export const CommentDescription = styled.p`
  margin: 0;
  margin-top: 3px;
  font-size: 1.5rem;
`;

export const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 315px;
  height: 64px;
  right: 0;
  bottom: -80px;
  padding: 3px 10px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 10px;
  overflow: hidden;

  ${mq('sm')} {
    width: auto;
    position: relative;
    bottom: initial;
    right: initial;
    box-shadow: initial;
    padding: 3px 0;
  }
`;

export const CommentInput = styled.textarea`
  width: 230px;
  font-size: 2rem;
  border-bottom: 1px solid #555;
  outline: none;
  border: none;
  resize: none;

  ${mq('sm')} {
    width: 80%;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
  }
`;

export const CommentSendButton = styled.button`
  background-color: transparent;
  font-size: 4rem;
  border: none;
`;

export const ModifyButton = styled.button`
  position: fixed;
  right: -115px;
  bottom: -100px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  border: none;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 4000;

  ${mq('sm')} {
    position: absolute;
    top: 15px;
    right: 50px;
    width: fit-content;
    height: fit-content;
    box-shadow: initial;
  }
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;

  ${mq('sm')} {
    width: 24px;
    height: 24px;
  }
`;
