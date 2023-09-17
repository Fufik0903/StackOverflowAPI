import styles from "./../../assets/styles/Search.module.scss";
import Select from "react-select";

const SearchComponent = ({
	searchValue,
	searchPost,
	value,
	setSortValue,
	setOrderValue,
	options,
	orderBy,
	validationErr,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<input
					type='text'
					className={`${styles.searchInput} ${
						validationErr && styles.err
					}`}
					autoFocus
					placeholder='Поиск...'
					onChange={(e) => {
						searchValue(e);
					}}
					onKeyDown={(e) => {
						searchValue(e);
					}}
					value={value}
				/>
				{validationErr && <span>Поле текст необходимо заполнить!</span>}
			</div>

			<div className={styles.filters}>
				<Select
					options={options}
					defaultValue={options[0]}
					onChange={(e) => setSortValue(e.value)}
				/>
				<Select
					options={orderBy}
					defaultValue={orderBy[0]}
					onChange={(e) => setOrderValue(e.value)}
				/>
			</div>
			<button onClick={searchPost} className={styles.searchBtn}>
				Поиск
			</button>
		</div>
	);
};

export default SearchComponent;
