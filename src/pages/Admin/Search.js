import { getAllUsers } from "api/user";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import Modal from "./Modal";
import Table from "./Table";

const Search = () => {
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const Searching = (category, searchInput) => {
    let filteredData = "";

    if (category === undefined) {
      let tmpArr = new Array();
      for (let i = 0; i < pageData.length; i++) {
        Object.values(pageData[i]).includes(searchInput) ? tmpArr.push(i) : "";
      }
      filteredData = pageData.filter((item, index) => tmpArr.includes(index));
    } else {
      filteredData = pageData.filter(
        (item) => item[`${category}`] === searchInput
      );
    }

    if (filteredData.length === 0) {
      filteredData = "noresult";
    }
    setPage(1);
    return filteredData;
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

  const [isShown, setIsShown] = useState(false);
  const handleModalOpen = () => setIsShown(true);

  return (
    <>
      <Container>
        <SearchBox>
          <Category onChange={handleCategoryChange} ref={selectItem}>
            <option value="default">전체</option>
            <option value="userId" ref={selectItem}>
              아이디
            </option>
            <option value="name" ref={selectItem}>
              이름
            </option>
            <option value="role" ref={selectItem}>
              권한
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
            <SearchInput
              type="search"
              name="userInput"
              value={userInput}
              onChange={handleSearchChange}
              placeholder="&#xF002; 검색"
            />
          </form>
        </SearchBox>
        <OptionBtnBox>
          <input type="reset" onClick={clearState} value="목록" />
          <button onClick={handleModalOpen}>계정 생성</button>
        </OptionBtnBox>
        {isShown && <Modal setIsShown={setIsShown} />}
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

const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.select`
  font-family: "Font Awesome 5 Free";
  font-weight: 600;
  text-align: center;
  opacity: 0.4;
  border-radius: 3px;
  outline: none;
`

const SearchBox = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  ::placeholder {
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
    text-align: center;
    opacity: 0.5;
  }
  outline: none;
  height: 30px;
  width: 300px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-left: 10px;
`;

const OptionBtnBox = styled.div`
  input,
  button {
    margin-right: 10px;
    cursor: pointer;
    width: 100px;
    height: 30px;
    background-color: ${theme.colors.green};
    border-radius: 3px;
    border: none;
    color: white;
    box-shadow: 2px 1px 5px 1px rgba(0, 0, 0, 0.1);
    &:active {
      transform: translate3d(2px, 2px, 0px);
    }
  }
`;
export default Search;
