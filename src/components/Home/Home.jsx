import React from "react";
import SearchContainer from "../SearchBlock/SearchContainer";
import PostsLists from "../PostsBlock/PostsList/PostsLists";

const Home = () => {
	return (
		<>
			<SearchContainer />
			<PostsLists />
		</>
	);
};

export default Home;
