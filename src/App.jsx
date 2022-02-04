import React, { useEffect } from 'react';
import IndexPage from './pages/main';
import GlobalStyle from './style/GlobalStyle';
import { addNewRecord } from './dataProvider';

// Routing필요 시 라이브러리 추가설치 필요
function App() {
  return (
    <>
      <input
        type="file"
        onChange={(a) => {
          addNewRecord('sdf', 0, '2022-01-01', (11, 22), 2, 'Test', 2, [a.target.files[0]]);
        }}
      />
      <GlobalStyle />
      <IndexPage />
    </>
  );
}

export default App;
