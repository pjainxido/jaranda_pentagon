import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  cursor: pointer;
  margin: 0 5px;
`;

const PageNextButton = styled(ButtonStyle)`
  border: 1px solid black;
  height: 30px;
  font-size: 1rem;
`;

const PageButton = styled(ButtonStyle)`
  width: 50px;
  border: 1px solid
    ${(props) => (props.clickButton ? "#A5D25F" : "rgba(0, 0, 0, 0.1)")};
  color: ${(props) => (props.clickButton ? "#A5D25F" : "black")};
  font-size: 1.5rem;
`;

const AlertMsg = styled.div`
  margin-top: 10px;
  color: red;
`;

function Pagenation({ page, setPage, pageData }) {
  const [pageCount, setPageCount] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const handlePageClick = (e) => {
    const { innerText } = e.target;
    setPage(Number(innerText));
    return;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pageData.length / 10); i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (pageCount === 1) {
      setAlertMessage("마지막 페이지 입니다");
      return;
    }
    setPageCount((pageCount) => pageCount - 1);
    setAlertMessage("");
    return;
  };

  const handleNextPage = () => {
    const pages = Math.round(Math.floor(pageData.length / 10) / 10);
    if (pageCount + 1 > pages) {
      setAlertMessage("마지막 페이지 입니다");
      return;
    }
    setPageCount((pageCount) => pageCount + 1);
    setAlertMessage("");
    return;
  };

  return (
    <Container>
      <div>
        <PageNextButton onClick={handlePrevPage}>PREV</PageNextButton>
        {pageNumbers.slice(10 * (pageCount - 1), 10 * pageCount).map((item) => (
          <PageButton
            key={item}
            onClick={handlePageClick}
            clickButton={page === item}
          >
            {item}
          </PageButton>
        ))}

        <PageNextButton onClick={handleNextPage}>NEXT</PageNextButton>
      </div>
      {alertMessage && <AlertMsg>{alertMessage}</AlertMsg>}
    </Container>
  );
}

Pagenation.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageData: PropTypes.array,
};

export default Pagenation;
