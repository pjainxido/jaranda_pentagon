import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'styles/theme';
import ToastPortal from 'components/ToastPortal';

let message = '마지막 페이지 입니다';
const toast = { mode: 'error', message };

const Pagination = ({ pageNationData: { currentPage, limit, setCurrentPage, data } }) => {
  const [totalPageCount, setTotalPageCount] = useState(1);
  const toastRef = useRef();

  const handlePageClick = (e) => {
    const { innerText } = e.target;
    setCurrentPage(Number(innerText));
    return;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / limit); i++) {
    pageNumbers.push(i);
  }

  const handleDoublePrevPage = () => {
    if (pageNumbers.length < 5) {
      return;
    }
    setCurrentPage(5 * (totalPageCount - 2) + 1);
    setTotalPageCount((totalPageCount) => totalPageCount - 1);
    return;
  };

  const handleDobleNextPage = () => {
    if (pageNumbers.length < 5) {
      return;
    }

    setCurrentPage(5 * totalPageCount + 1);
    setTotalPageCount((totalPageCount) => totalPageCount + 1);
    return;
  };

  const handleToastOpen = () => {
    toastRef.current.addMessage(toast);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    if (currentPage === 5 * (totalPageCount - 1) + 1) {
      setTotalPageCount((totalPageCount) => totalPageCount - 1);
    }
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage >= pageNumbers[pageNumbers.length - 1]) {
      return;
    }
    if (currentPage === 5 * totalPageCount) {
      setTotalPageCount((totalPageCount) => totalPageCount + 1);
    }
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <Container>
      <div>
        <PageNextButton
          onClick={() => {
            if (totalPageCount === 1) {
              handleToastOpen();
              return;
            }
            handleDoublePrevPage();
            return;
          }}
        >
          <i className='fas fa-angle-double-left' />
        </PageNextButton>
        <PageNextButton onClick={handlePrevPage}>
          <i className='fas fa-chevron-left' />
        </PageNextButton>
        {pageNumbers.slice(5 * (totalPageCount - 1), 5 * totalPageCount).map((item) => (
          <PageButton key={item} onClick={handlePageClick} clickButton={currentPage === item}>
            {item}
          </PageButton>
        ))}
        <PageNextButton onClick={handleNextPage}>
          <i className='fas fa-chevron-right' />
        </PageNextButton>
        <PageNextButton
          onClick={() => {
            if (totalPageCount >= Math.ceil(pageNumbers.length / 5)) {
              handleToastOpen();
              return;
            }
            handleDobleNextPage();
            return;
          }}
        >
          <i className='fas fa-angle-double-right' />
        </PageNextButton>
      </div>
      <ToastPortal ref={toastRef} autoCloseTime={3000} autoClose={true} position={'bottom-center'} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = styled.button`
  background-color: inherit;
  margin: 0 5px;
`;

const PageNextButton = styled(ButtonStyle)`
  border: none;
  height: 30px;
  font-size: 1rem;
`;

const PageButton = styled(ButtonStyle)`
  width: 50px;
  border: 1px solid ${(props) => (props.clickButton ? theme.colors.green : 'black')};
  color: ${(props) => (props.clickButton ? theme.colors.green : 'black')};
  font-size: 1.5rem;
  border-radius: 2px;
`;

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  data: PropTypes.array,
  limit: PropTypes.number,
  pageNationData: PropTypes.object,
};

export default Pagination;
