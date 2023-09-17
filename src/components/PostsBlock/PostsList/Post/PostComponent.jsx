import styles from "./../../../../assets/styles/Post.module.scss";

const PostComponent = ({ item }) => {
	const {
		tags,
		answer_count,
		title,
		owner: { display_name },
	} = item;

	return (
		<div className={styles.container}>
			<span className={styles.text}>{display_name}</span>
			<span className={styles.text}>{title}</span>
			<span className={styles.text}>{answer_count}</span>
			<div className={`${styles.text} ${styles.tagsContainer}`}>
				{tags?.map((item, index) => (
					<div className={styles.tags} key={index}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default PostComponent;
