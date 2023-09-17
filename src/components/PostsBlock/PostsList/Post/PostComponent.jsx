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
			<span>{display_name}</span>
			<span>{title}</span>
			<span>{answer_count}</span>
			<span>{tags}</span>
		</div>
	);
};

export default PostComponent;
