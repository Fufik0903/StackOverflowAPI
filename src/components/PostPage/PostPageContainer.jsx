import React, { useEffect, useState } from "react";
import PostPageComponent from "./PostPageComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../feature/posts/postsSlice";
import Loader from "../Loader/Loader";

const PostPageContainer = () => {
	let { id } = useParams();
	const {
		posts: { post, comments, isLoading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const postResponse = async (id) => {
		await dispatch(getPost(id));
	};
	useEffect(() => {
		postResponse(id);
	}, [id]);
	
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<PostPageComponent {...post} comments={comments} />
			)}
		</>
	);
};

export { PostPageContainer };
