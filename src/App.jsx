import React, { useEffect } from 'react';
import IndexPage from './pages/main';
import GlobalStyle from './style/GlobalStyle';

import { getRecordList } from './dataProvider';

// Routing필요 시 라이브러리 추가설치 필요
function App() {
  useEffect(() => {
    getRecordList();
  }, []);

  return (
    <>
      <GlobalStyle />
      <IndexPage />
    </>
  );
}

export default App;
