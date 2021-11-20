import React, { useEffect } from 'react';
import IndexPage from './pages/main';
import GlobalStyle from './style/GlobalStyle';
import { getComment, addComment, addNewRecord, getAllImage, deleteComment, deleteRecord } from './dataProvider';

// Routing필요 시 라이브러리 추가설치 필요
function App() {
  const testRecordID = 'WxfsuqNRkkzwFRGJ8iga';
  useEffect(() => {
    const comment = {
      auther: 'dfd',
      desc: 'sdfW',
    };
    console.log(typeof Date.now());

    //getComment(testRecordID);
    //addNewRecord();
    //addComment(testRecordID, comment);
    deleteRecord(testRecordID);
    //deleteComment(testRecordID, 'LnvhsCBeQf9WLBeOyzON');
  });

  return (
    <>
      <GlobalStyle />
      <IndexPage />
    </>
  );
}

export default App;
