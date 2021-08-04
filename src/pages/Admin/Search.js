import { getAllUsers } from "api/user";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Table from "./Table";

const Search = () => {
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const Searching = (category, searchInput) => {
    let filterdData = pageData.filter(
      (item) => item[`${category}`] === searchInput
    );
    if (filterdData.length === 0) {
      filterdData = "noresult";
    }
    setPage(1);
    return filterdData;
  };

  const [category, setCategory] = useState();
  const [inputs, setInputs] = useState({
    userInput: "",
  });
  const [searchedItem, setSearchedItem] = useState([]);

  const { userInput } = inputs;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const result = Searching(category, inputs.userInput);
    setSearchedItem(result);
  };

  const selectItem = useRef();

  const clearState = (e) => {
    e.preventDefault();
    setCategory();
    setInputs({
      userInput: "",
    });
    setSearchedItem([]);
    selectItem.current.value = "default";
  };

  useEffect(async () => {
    try {
      const data = await getAllUsers();
      setPageData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Container>
        <Category onChange={handleCategoryChange} ref={selectItem}>
          <option value="default">선택</option>
          <option value="userId" ref={selectItem}>
            ID
          </option>
          <option value="name" ref={selectItem}>
            이름
          </option>
          <option value="role" ref={selectItem}>
            역할
          </option>
          <option value="address" ref={selectItem}>
            주소
          </option>
          <option value="age" ref={selectItem}>
            나이
          </option>
          <option value="creditCard" ref={selectItem}>
            카드번호
          </option>
        </Category>
        <form onSubmit={onSubmit}>
          <Input
            type="search"
            name="userInput"
            value={userInput}
            onChange={handleSearchChange}
            placeholder="검색"
          />
          <Input type="submit" value="검색" />
        </form>
        <Back>
          <Input type="reset" onClick={clearState} value="목록" />
        </Back>
      </Container>
      <div>
        {searchedItem.length > 0 ? (
          searchedItem === "noresult" ? (
            <div>검색결과가 없습니다.</div>
          ) : (
            <Table
              data={searchedItem}
              page={page}
              setPage={setPage}
              loading={loading}
            />
          )
        ) : (
          <Table
            data={pageData}
            page={page}
            setPage={setPage}
            loading={loading}
          />
        )}
      </div>
    </>
  );
};

const Back = styled.div`
  position: absolute;
  right: 20px;
`;

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Category = styled.select`
  color: black;
`;

const Input = styled.input`
  color: black;
  cursor: pointer;
`;

export default Search;
