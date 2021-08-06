import React from 'react';
import styled from 'styled-components';

const ResultNotFound = () => {
  return (
    <StyledResult>
      <div>
        <i className='fas fa-search' />
        일치하는 검색결과가 없습니다.
      </div>
      <StyledList>
        <li>모든 단어의 철자가 정확한지 확인하세요.</li>
        <li>다른 검색어를 사용해 보세요.</li>
        <li>더 일반적인 검색어를 사용해 보세요.</li>
      </StyledList>
    </StyledResult>
  );
};

const StyledResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  font-size: 24px;
`;

const StyledList = styled.ul`
  list-style: inside;
  padding: 20px 0;
  line-height: 24px;
  font-size: 18px;
`;

export default ResultNotFound;
