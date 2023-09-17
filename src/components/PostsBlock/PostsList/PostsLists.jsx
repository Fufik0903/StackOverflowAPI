import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "./../../Loader/Loader";
import PostComponent from "./Post/PostComponent";

import styles from "./../../../assets/styles/PostList.module.scss";

import { getPosts, pageCounter } from "../../../feature/posts/postsSlice";
import { useEffect, useRef } from "react";

const PostsLists = () => {
	let {
		posts: { list, isLoading, params, page },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const ref = useRef(null);
	const firstUpdate = useRef(true);

	const showMore = async () => {
		let res = await dispatch(pageCounter(page + 1));
		await dispatch(getPosts({ ...params, page: res.payload }));
		// при пагинации скролл идет до кнопки (немного не правильно, должно скролить до следующего блока с записями)
		ref.current?.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		} else {
			showMore();
		}
	}, []);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
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
									<Link
										key={index}
										className={styles.link}
										to={`/post/${item.question_id}`}>
										<PostComponent item={item} />
									</Link>
								))}
							</div>
							{list.length >= 10 && (
								<div className={styles.showMoreContainer} ref={ref}>
									<button
										className={styles.showMoreBtn}
										onClick={showMore}>
										Показать еще
									</button>
								</div>
							)}
						</>
					) : (
						<>
							{firstUpdate.current ? (
								<div className={styles.badRequest}>
									Задайте вопрос
								</div>
							) : (
								<div className={styles.badRequest}>
									Запрос не найден
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default PostsLists;
