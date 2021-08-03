import React, { useState } from "react";
import styled from "styled-components";
import { data } from "./dummy_data.json";

const Searching = (category, searchInput) => {
  const filterdData = data.filter(
    (item) => item[`${category}`] === searchInput
  );
  return filterdData;
};

const Search = () => {
  const [category, setCategory] = useState();
  const [inputs, setInputs] = useState();

  const handleOnChange = (e) => {
    setCategory(e.target.value);
  };

  const onChange = (e) => {
    setInputs(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Searching(category, inputs);
  };
  return (
    <>
      <Container>
        <Category onChange={handleOnChange}>
          <option value="default">선택</option>
          <option value="userId">ID</option>
          <option value="name">이름</option>
          <option value="role">역할</option>
          <option value="address">주소</option>
          <option value="age">나이</option>
          <option value="creditCard">카드번호</option>
        </Category>
        <form onSubmit={onSubmit}>
          <SearchBox type="search" onChange={onChange} />
          <SearchBox type="submit" value="검색" />
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const Category = styled.select`
  color: black;
`;

const SearchBox = styled.input`
  color: black;
`;

export default Search;
