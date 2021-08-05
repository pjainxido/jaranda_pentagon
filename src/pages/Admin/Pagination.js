import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "styles/theme";

const Pagination = ({ page, perPage, setPage, pageData }) => {
  const [pageCount, setPageCount] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const handlePageClick = (e) => {
    const { innerText } = e.target;
    setPage(Number(innerText));
    return;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pageData.length / perPage); i++) {
    pageNumbers.push(i);
  }

  const handleDoublePrevPage = () => {
    if (pageNumbers.length < 5) {
      return;
    }
    if (pageCount === 1) {
      setAlertMessage("마지막 페이지 입니다");
      return;
    }
    setPage(5 * (pageCount - 2) + 1);
    setPageCount((pageCount) => pageCount - 1);
    setAlertMessage("");
    return;
  };

  const handleDobleNextPage = () => {
    const pages = Math.floor(Math.ceil(pageData.length / perPage) / 5);
    if (pageNumbers.length < 5) {
      return;
    }
    if (pageCount > pages) {
      setAlertMessage("마지막 페이지 입니다");
      return;
    }
    setPage(5 * pageCount + 1);
    setPageCount((pageCount) => pageCount + 1);
    setAlertMessage("");
    return;
  };

  const handlePrevPage = () => {
    if (page === 1) {
      return;
    }
    if (page === 5 * (pageCount - 1) + 1) {
      setPageCount((pageCount) => pageCount - 1);
    }
    setPage((page) => page - 1);
  };

  const handleNextPage = () => {
    const pages = Math.ceil(pageData.length / perPage);
    if (page >= pages) {
      return;
    }
    if (page === 5 * pageCount) {
      setPageCount((pageCount) => pageCount + 1);
    }
    setPage((page) => page + 1);
  };

  return (
    <Container>
      <div>
        <PageNextButton onClick={handleDoublePrevPage}>
          <i className="fas fa-angle-double-left" />
        </PageNextButton>
        <PageNextButton onClick={handlePrevPage}>
          <i className="fas fa-chevron-left" />
        </PageNextButton>
        {pageNumbers.slice(5 * (pageCount - 1), 5 * pageCount).map((item) => (
          <PageButton
            key={item}
            onClick={handlePageClick}
            clickButton={page === item}
          >
            {item}
          </PageButton>
        ))}
        <PageNextButton onClick={handleNextPage}>
          <i className="fas fa-chevron-right" />
        </PageNextButton>
        <PageNextButton onClick={handleDobleNextPage}>
          <i className="fas fa-angle-double-right" />
        </PageNextButton>
      </div>
      {alertMessage && <AlertMsg>{alertMessage}</AlertMsg>}
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
  border: 1px solid
    ${(props) => (props.clickButton ? theme.colors.green : "black")};
  color: ${(props) => (props.clickButton ? theme.colors.green : "black")};
  font-size: 1.5rem;
  border-radius: 2px;
`;

const AlertMsg = styled.div`
  margin-top: 10px;
  color: red;
`;

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageData: PropTypes.array,
  perPage: PropTypes.number,
};

export default Pagination;
