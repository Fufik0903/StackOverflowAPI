import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SearchComponent from "./SearchComponent";
import { getPosts } from "../../feature/posts/postsSlice";

const options = [
	{ value: "activity", label: "По дате изменения" },
	{ value: "creation", label: "По дате создания" },
	{ value: "votes", label: "По числу голосов" },
	{ value: "relevance", label: "По совпадениям" },
];
const orderBy = [
	{ value: "desc", label: "По убыванию" },
	{ value: "asc", label: "По возрастанию" },
];
const SearchContainer = () => {
	const [value, setValue] = useState("");
	const [sortValue, setSortValue] = useState(options[0].value);
	const [orderValue, setOrderValue] = useState(orderBy[0].value);
	const [validationErr, setValidationErr] = useState(false)
	const dispatch = useDispatch();

	const searchValue = (e) => {
		if (e.key == "Enter") {
			searchPost();
		} else {
			setValue(e.target.value);
		}
	};
	const searchPost = () => {
		try {
			if (value == "") {
				setValidationErr(true)
			} else {
				setValidationErr(false)
				dispatch(getPosts({ value, sortValue, orderValue}));
			}
		} catch (err) {
			throw new Error(err);
		}
	};

	useEffect(()=>{
		if (value) setValidationErr(false)
	},[value])
	return (
		<SearchComponent
			searchValue={searchValue}
			searchPost={searchPost}
			value={value}
			setSortValue={setSortValue}
			options={options}
			setOrderValue={setOrderValue}
			orderBy={orderBy}
			validationErr={validationErr}
		/>
	);
};

export default SearchContainer;
