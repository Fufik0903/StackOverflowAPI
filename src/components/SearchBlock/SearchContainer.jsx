import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchComponent from "./SearchComponent";
import { getPosts, pageCounter, refreshSearch } from "../../feature/posts/postsSlice";

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
	const {posts: { params:{value} }}= useSelector((state)=>state)
	const [textValue, setTextValue] = useState(value);
	const [sortValue, setSortValue] = useState(options[0].value);
	const [orderValue, setOrderValue] = useState(orderBy[0].value);
	const [validationErr, setValidationErr] = useState(false);
	const dispatch = useDispatch();

	const searchValue = (e) => {
		if (e.key == "Enter") {
			searchPost();
		} else {
			setTextValue(e.target.value);
		}
	};
	const searchPost = async () => {
		try {
			if (textValue == "") {
				setValidationErr(true);
			} else {
				setValidationErr(false);
				await dispatch(pageCounter(1));
				await dispatch(refreshSearch())
				dispatch(getPosts({ value:textValue, sortValue, orderValue }));
			}
		} catch (err) {
			throw new Error(err);
		} 
	};

	useEffect(() => {
		if (textValue) setValidationErr(false);
	}, [textValue]);
	return (
		<SearchComponent
			searchValue={searchValue}
			searchPost={searchPost}
			value={textValue}
			setSortValue={setSortValue}
			options={options}
			setOrderValue={setOrderValue}
			orderBy={orderBy}
			validationErr={validationErr}
		/>
	);
};

export default SearchContainer;
