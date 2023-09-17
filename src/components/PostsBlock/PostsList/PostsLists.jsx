import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "./../../Loader/Loader";
import PostComponent from "./Post/PostComponent";

import styles from "./../../../assets/styles/PostList.module.scss";

import { getPosts, pageCounter } from "../../../feature/posts/postsSlice";
import { useEffect } from "react";



const List = ({ list, showMore }) => {
	return (
		<>
			{list.length > 0 ? (
				<>
					<div className={styles.title}>
						<span>Автор вопрос</span>
						<span>Тема</span>
						<span>Колличество ответов</span>
						<span>Теги</span>
					</div>
					<div className={styles.container}>
						{list.map((item, index) => (
							<Link key={index} className={styles.link} to={`/post/${item.question_id}`}>
								<PostComponent item={item} />
							</Link>
						))}
					</div>
					{list.length >= 10 && (
						<div className={styles.showMoreContainer}>
							<button
								className={styles.showMoreBtn}
								onClick={showMore}>
								Показать еще
							</button>
						</div>
					)}
				</>
			) : <div className={styles.badRequest}>Запрос не найден</div>}
		</>
	);
};

const PostsLists = () => {
	let {
		posts: { list, isLoading, params, page },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const showMore = async () => {
		let res = await dispatch(pageCounter(page + 1));
		dispatch(getPosts({ ...params, page: res.payload }));
	};
	useEffect(()=>{
		showMore()
	},[])
	return (
		<div>
			{isLoading ? <Loader /> : <List list={list} showMore={showMore} />}
		</div>
	);
};

export default PostsLists;
