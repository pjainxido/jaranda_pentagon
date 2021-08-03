import React, { useState } from "react";
import styled from "styled-components";
import { data } from "./dummy_data.json";

const Searching = (category, searchInput) => {

	const filterdData = data.filter((item) => item[`${category}`] === searchInput);
	if (!filterdData) {
		filterdData = "noresult";
	}

	return filterdData;
}

const Search = () => {
	const [category, setCategory] = useState();
	const [inputs, setInputs] = useState({
		userInput: '',
	});
	const [searchedItem, setSearchedItem] = useState();

	const { userInput } = inputs;

	const handleOnChange = (e) => {
		setCategory(e.target.value);
	}

	const onChange = (e) => {
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
		setInputs({
			userInput: '',
		});
	};

	console.log(searchedItem)
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
					<SearchBox type="search" name="userInput" value={userInput} onChange={onChange} />
					<SearchBox type="submit" value="검색" />
				</form>
			</Container>
		</>
	)
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
