import React from "react";
import styles from "./../../assets/styles/Loader.module.scss";
const Loader = () => {
	return (
		<div className={styles.container}>
			<div className={styles["lds-roller"]}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
