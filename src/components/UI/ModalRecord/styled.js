import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 900px;
  height: 500px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

export const Slider = styled.div`
  width: 64%;
  height: 100%;
`;

export const NoImage = styled.div`
  width: 64%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

export const InfoWrapper = styled.div`
  width: 36%;
  padding: 4rem 2rem 0 2rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const TagWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
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
`;

export const ModifyButton = styled.button`
  position: fixed;
  bottom: 65px;
  right: 70px;
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
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
`;
