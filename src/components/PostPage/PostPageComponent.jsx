import React from "react";

import styles from "./../../assets/styles/PostPage.module.scss";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const PostPageComponent = (props) => {
	const { owner, title, body, tags, comments } = props;

	return (
		<div className={styles.container}>
			<Link  className={styles.btnBack} to={`/`}>Назад</Link>
			<div>
				<span>
					<strong>Автор:</strong>
				</span>
				<span>{owner?.display_name}</span>
			</div>
			<div>
				<span>
					<strong>Тема вопроса:</strong>
				</span>
				<span>{title}</span>
			</div>
			<div className={styles.tagsContainer}>
				{tags?.map((item, index) => (
					<div className={styles.tags} key={index}>
						{item}
					</div>
				))}
			</div>
			<div dangerouslySetInnerHTML={{ __html: body }} />
			{comments.length > 0 && (
				<div>
					<h1>Комментарии</h1>
					<div className={styles.commentBlock}>
						{comments?.map(
							({ owner, body, creation_date }, index) => {
								return (
									<div
										className={styles.commentContainer}
										key={index}>
										<div className={styles.commentOwner}>
											{owner?.display_name}
										</div>
										<div className={styles.commentDate}>
											{moment
												.unix(creation_date)
												.format("DD MMMM YYYY")}
										</div>
										<div
											dangerouslySetInnerHTML={{
												__html: body,
											}}
										/>
									</div>
								);
							}
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default PostPageComponent;
