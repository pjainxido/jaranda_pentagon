import React, { useState } from "react";
import styled from "styled-components";
import { data } from "./dummy_data.json";
import Table from "./Table";
import { Link } from "react-router-dom";

const Searching = (category, searchInput) => {
	// console.log(category, searchInput)
	let filterdData = data.filter((item) => item[`${category}`] === searchInput);
	if (filterdData.length === 0) {
		filterdData = "noresult";
	}
	return filterdData;
}

const Search = () => {
	const [category, setCategory] = useState();
	const [inputs, setInputs] = useState({
		userInput: '',
	});
	const [searchedItem, setSearchedItem] = useState([]);

	const { userInput } = inputs;

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	}

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

	const clearState = (e) => {
		e.preventDefault();
		setInputs({
			userInput: '',
		});
		setSearchedItem([]);
	};

	// console.log(searchedItem)
	return (
		<>
			<Container>
				<Category onChange={handleCategoryChange}>
					<option value="default">선택</option>
					<option value="userId">ID</option>
					<option value="name">이름</option>
					<option value="role">역할</option>
					<option value="address">주소</option>
					<option value="age">나이</option>
					<option value="creditCard">카드번호</option>
				</Category>
				<form onSubmit={onSubmit}>
					<SearchBox
						type="search"
						name="userInput"
						value={userInput}
						onChange={handleSearchChange}
						placeholder="검색"
					/>
				</form>
				<Link to="/admin">
					<SearchBox type="reset" onClick={clearState}/>
				</Link>
			</Container>
			<div>
				{
					searchedItem.length > 0 ?
					(
						searchedItem === "noresult" ?
							<div>검색결과가 없습니다.</div> : <Table data={searchedItem} />
					) : <Table data={data} />
				}
			</div>
		</>
	)
};

//<div>{searchedItem.map((i) => <div key={i.creditCard}>{i.name}</div>)}</div>

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
