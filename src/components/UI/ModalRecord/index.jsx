import React, { useState } from 'react';
import ModalLayout from '../../Layout/ModalLayout';
import MarkerIcon from '../Icon/Marker';
import CalendarIcon from '../Icon/Calendar';
import PencilIcon from '../Icon/Pencil';
import TrashcanIcon from '../Icon/Trashcan';
import * as Style from './styled';

function ModalRecord({ record, user, comments, closeModal, clickModifyButton, createComment, deleteComment }) {
  const [value, setValue] = useState('');

  const onSubmitComment = (event) => {
    event.preventDefault();
    createComment(value);
    setValue('');
  };

  return (
    <>
      <ModalLayout closeModal={closeModal}>
        <Style.Container>
          {record.images && record.images.length ? <Style.Slider /> : <Style.NoImage>No Images</Style.NoImage>}
          <Style.InfoWrapper>
            <Style.Title>{record.place}</Style.Title>
            <Style.TagWrapper>
              <Style.Tag>{record.cityTag}</Style.Tag>
              <Style.Tag>{record.placeTag}</Style.Tag>
            </Style.TagWrapper>
            <Style.Info>
              <Style.Icon>
                <MarkerIcon />
              </Style.Icon>
              <Style.InfoText>{record.address}</Style.InfoText>
            </Style.Info>
            <Style.Info>
              <Style.Icon>
                <CalendarIcon />
              </Style.Icon>
              <Style.InfoText>
                최근 방문 날짜 : {record.date} <br />
                방문 횟수 : {record.numOfVisit}
              </Style.InfoText>
            </Style.Info>
            <Style.CommentTitle>comment</Style.CommentTitle>
            <Style.CommentList>
              {comments.map((comment) => (
                <Style.CommentItem key={comment.id}>
                  <Style.CommentHeader>
                    <Style.CommentAuthor>{comment.auther}</Style.CommentAuthor>
                    {comment.auther === user && (
                      <Style.DeleteIcon onClick={() => deleteComment(comment.id)}>
                        <TrashcanIcon />
                      </Style.DeleteIcon>
                    )}
                  </Style.CommentHeader>
                  <Style.CommentDescription>{comment.desc}</Style.CommentDescription>
                </Style.CommentItem>
              ))}
            </Style.CommentList>
          </Style.InfoWrapper>
          <Style.CommentForm onSubmit={onSubmitComment}>
            <Style.CommentInput value={value} onChange={(event) => setValue(event.target.value)} />
            <Style.CommentSendButton>☺️</Style.CommentSendButton>
          </Style.CommentForm>
        </Style.Container>
      </ModalLayout>
      <Style.ModifyButton onClick={() => clickModifyButton(record)}>
        <Style.IconWrapper>
          <PencilIcon />
        </Style.IconWrapper>
      </Style.ModifyButton>
    </>
  );
}

export default ModalRecord;
